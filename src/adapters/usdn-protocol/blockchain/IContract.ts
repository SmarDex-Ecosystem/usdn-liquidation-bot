/** Interface for usdn contract */
export default interface IContract {
    /** Get the highest populated tick
     * @returns The highest populated tick
     */
    getHighestPopulatedTick(): Promise<number>;

    /** Multicall
     * @returns The result of the multicall
     */
    multicall(): Promise<
        | (
              | {
                    error?: undefined;
                    result: number;
                    status: 'success';
                }
              | {
                    error: Error;
                    result?: undefined;
                    status: 'failure';
                }
          )[]
        | {
              error: unknown;
              status: string;
          }[]
    >;
}
