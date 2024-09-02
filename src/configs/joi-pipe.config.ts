import { JoiPipeModuleOptions } from 'nestjs-joi/internal/joi-pipe.module';

export const joiPipeConfig: JoiPipeModuleOptions = {
  pipeOpts: {
    usePipeValidationException: true,
    defaultValidationOptions: {
      allowUnknown: false,
    },
  },
};
