/** Interface for getting the highest populated tick */
export default interface IGetHighestPopulatedTick {
    /** Get the highest populated tick
     * @returns The highest populated tick
     */
    getHighestPopulatedTick(): Promise<bigint>;
}
