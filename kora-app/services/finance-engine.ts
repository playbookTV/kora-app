
/**
 * Core Financial Logic for Kora
 */

export const FinanceEngine = {
    /**
     * Calculate days remaining until the next payday.
     * @param paydayDay The day of the month (1-31).
     * @returns number of days from today.
     */
    calculateDaysToPayday: (paydayDay: number): number => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // 0-indexed
        const currentDay = today.getDate();

        // Construct payday date for this month
        let targetDate = new Date(currentYear, currentMonth, paydayDay);

        // If today is past this month's payday, user is waiting for NEXT month's payday
        if (currentDay > paydayDay) {
            targetDate = new Date(currentYear, currentMonth + 1, paydayDay);
        }

        // Calculate difference in time
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0; // Should be at least 0 (today is payday)
    },

    /**
     * Calculate Safe Spend Today.
     * Formula: (Balance - Remaining Fixed Expenses) / Days to Payday
     * @param balance Current Available Balance
     * @param fixedExpenses Total of monthly fixed expenses
     * @param daysToPayday Number of days until payday
     * @returns Safe Spend Amount
     */
    calculateSafeSpend: (balance: number, fixedExpenses: number, daysToPayday: number): number => {
        // Simplified Logic: Assume fixed expenses are treated as a bulk deduction for the month
        // In a real app, we'd check which expenses are *already paid* vs *pending*.
        // For MVP/Hackathon: We deduct the FULL fixed expenses from balance if daysToPayday > 15 (assuming early in month),
        // or a pro-rated amount? 
        // Better yet, for MVP: Let's assume 'Balance' is 'Spending Money Left'.
        // BUT, the spec says "Safe Spend = (Balance - Fixed Expenses) / Days".
        // Let's stick to the spec formula.

        // Edge Case: If daysToPayday is 0 or 1, Safe Spend is Balance.
        if (daysToPayday <= 1) return balance;

        const effectiveBalance = balance - fixedExpenses;

        if (effectiveBalance <= 0) return 0;

        return Math.floor(effectiveBalance / daysToPayday);
    }
};
