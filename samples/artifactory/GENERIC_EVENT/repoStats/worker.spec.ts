import { PlatformContext, PlatformClients, PlatformHttpClient } from 'jfrog-workers';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import runWorker from './worker';

describe("repo-stats tests", () => {
    let context: DeepMocked<PlatformContext>;
    const request: void = undefined;

    beforeEach(() => {
        context = createMock<PlatformContext>({
            clients: createMock<PlatformClients>({
                platformHttp: createMock<PlatformHttpClient>({
                    get: jest.fn().mockResolvedValue({
                        status: 200,
                        // update the data to match the content of the actual data
                        data: [
                            { type: 'a' },
                            { type: 'a' },
                            { type: 'b' },
                            { type: 'c' }
                        ],
                    })
                })
            })
        });
    })

    it('should run', async () => {
        await expect(runWorker(context, request)).resolves.toEqual(expect.objectContaining({
            repositories: expect.objectContaining({
                // update the expected values to match the data
                a: 2, b: 1, c: 1
            })
        }))
    })
});