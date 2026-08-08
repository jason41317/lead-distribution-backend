import { DateTime } from "luxon";

import leadRepository from "../lead/repository.js";
import distributionRepository from "../distribution/repository.js";
import brokerRepository from "./repository.js";

export class BrokerBindingService {
  async bindLead(leadId: number) {
    const lead = await leadRepository.findById(leadId);

    if (!lead) {
      throw new Error(`Lead ${leadId} not found`);
    }

    //duplicate
    const duplicate = await leadRepository.findDuplicate(
      lead.email,
      lead.id,
    );

    if (duplicate) {
      await leadRepository.update(lead.id, {
        status: "duplicate",
      });

      return;
    }

    //form distribution
    const distribution = await distributionRepository.findByFormId(lead.formId);
    console.log('distribution : ');
    console.log(distribution)

    if (!distribution) {
      return;
    }

    //get distribtion brokers
    const distributionBrokers =
      await brokerRepository.findEligibleForDistribution(distribution.id);

    //working hours
    const workingBrokers = distributionBrokers.filter((item) =>
      this.isWithinWorkingHours(item.broker),
    );

    if (workingBrokers.length === 0) {
      return;
    }

    //daily cap
    const eligibleBrokers = [];

    for (const item of workingBrokers) {
      const broker = item.broker;

      const hasCapacity = await this.hasDailyCapacity(broker);

      if (!hasCapacity) {
        continue;
      }

      eligibleBrokers.push(item);
    }

    if (eligibleBrokers.length === 0) {
      return;
    }

    //daily total
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const totalSentToday = await brokerRepository.getTotalSentToday(
      startOfDay,
      endOfDay,
    );

    //broker count
    const brokersWithCounts = await Promise.all(
      eligibleBrokers.map(async (item) => {
        const sentToday = await brokerRepository.getSentToday(
          item.brokerId,
          startOfDay,
          endOfDay,
        );

        return {
          ...item,
          sentToday,
        };
      }),
    );

    //high deficit
    const selected = this.selectByDeficit(brokersWithCounts, totalSentToday);

    //set broker
    await leadRepository.update(lead.id, {
      broker: {
        connect: {
          id: selected.brokerId,
        },
      },
      status: "sent",
    });

    console.log(`Lead ${lead.id} assigned to broker ${selected.brokerId}`);
  }

  private isWithinWorkingHours(broker: any): boolean {
    const now = DateTime.now().setZone(broker.timezone);

    const day = now.weekday % 7;
    console.log(day)
    if (!broker.workingDays.includes(day)) {
      return false;
    }

    const currentTime = now.toFormat("HH:mm");

    return (
      currentTime >= broker.openingTime && currentTime <= broker.closingTime
    );
  }

  private async hasDailyCapacity(broker: any) {
    if (broker.dailyCap <= 0) {
      return true;
    }

    const now = DateTime.now().setZone(broker.timezone);

    const startOfDay = now.startOf("day").toUTC().toJSDate();
    const endOfDay = now.endOf("day").toUTC().toJSDate();

    const count = await brokerRepository.getDailyLeadCount(
      broker.id,
      startOfDay,
      endOfDay,
    );

    return count < broker.dailyCap;
  }

  private selectByDeficit(
    brokers: Array<{
      brokerId: number;
      percentage: number;
      sentToday: number;
    }>,
    totalSentToday: number,
  ) {
    const totalAfterLead = totalSentToday + 1;

    return brokers.reduce((selected, current) => {
      const currentTarget = (totalAfterLead * current.percentage) / 100;

      const currentDeficit = currentTarget - current.sentToday;

      const selectedTarget = (totalAfterLead * selected.percentage) / 100;

      const selectedDeficit = selectedTarget - selected.sentToday;

      return currentDeficit > selectedDeficit ? current : selected;
    });
  }
}
