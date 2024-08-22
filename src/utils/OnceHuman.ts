import type { TimeOfDay } from "./time";

class OnceHuman {
	/**
	 * Returns the next time that lootables will reset.
	 * This happens every four hours starting at 00:00 UTC.
	 */
	public static get nextLootablesResetDate(): Date {
		const now = new Date();
		const utcHours = now.getUTCHours();
		const utcMinutes = now.getUTCMinutes();

		const nextResetHour = (Math.floor(utcHours / 4) * 4 + 4) % 24;
		const resetTime = new Date(now);
		resetTime.setUTCHours(nextResetHour, 0, 0, 0);

		if (nextResetHour <= utcHours && utcMinutes > 0) {
			resetTime.setUTCDate(now.getUTCDate() + 1);
		}

		return resetTime;
	}

	/**
	 * Returns the next time that dailies will reset.
	 * This happens every day at 07:00 UTC.
	 *
	 * Dailies include `Vendors`, `Astral Dewlets`.
	 */
	public static get nextDailiesResetDate(): Date {
		const now = new Date();
		const utcHours = now.getUTCHours();
		const utcMinutes = now.getUTCMinutes();

		const resetTime = new Date(now);
		resetTime.setUTCHours(7, 0, 0, 0);

		if (utcHours >= 7 && utcMinutes > 0) {
			resetTime.setUTCDate(now.getUTCDate() + 1);
		}

		return resetTime;
	}

	/**
	 * Returns the next time of the weeklies reset.
	 * This happens every monday at 07:00 UTC.
	 *
	 * Weeklies include `Commissions`, `Purification`, `Vendors`, `Shop`.
	 */
	public static get nextWeekliesResetDate(): Date {
		const now = new Date();
		const dayOfWeek = now.getUTCDay();
		const daysUntilNextMonday = (8 - dayOfWeek) % 7;
		const resetDate = new Date(now);
		resetDate.setUTCDate(now.getUTCDate() + daysUntilNextMonday);
		resetDate.setUTCHours(7, 0, 0, 0);

		return resetDate;
	}

	public static get currentTimeOfDay(): TimeOfDay {
		const now = new Date();
		const realLifeMinutes = now.getMinutes();
		const realLifeSeconds = now.getSeconds();
		const realLifeMilliseconds = now.getMilliseconds();

		const totalRealLifeSeconds =
			realLifeMinutes * 60 + realLifeSeconds + realLifeMilliseconds / 1000;
		const inGameTotalMinutes = (totalRealLifeSeconds / 2.5) % 1440;
		const inGameHours = Math.floor(inGameTotalMinutes / 60);
		const inGameMinutes = Math.floor(inGameTotalMinutes % 60);

		return {
			hours: inGameHours,
			minutes: inGameMinutes,
		};
	}
}

export default OnceHuman;
