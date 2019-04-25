
import { GlobalConfig } from './config';

export const CkeditorConfig = {
    ckfinder: {
        options: {
            resourceType: 'Images'
        },
        uploadUrl: GlobalConfig.imageUploadUrl
        // {"fileName":"file name","uploaded":1,"error":{"number":201,"message":""},"url":"image url"}
    },
    // extraPlugins : ['FooPlugin', 'BarPlugin']
};
