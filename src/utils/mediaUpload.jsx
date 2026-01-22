import { createClient } from "@supabase/supabase-js"

    const key = "sb_publishable_QXELiw3FVWuEU3IF5DELCA_aVCXRJu2"
    const url = "https://osdzfrrupigztciamdol.supabase.co"

    const supabase = createClient(url, key)

export default function UploadFile(pic){
    const promise = new Promise(
        (resolve, reject)=>{
            if(pic == null){
                reject("Please select a file to upload")
                return;
            }
            const timeStamp = new Date().getTime();
            const picName = timeStamp+"."+pic.name
            
            supabase.storage.from("images").upload(picName, pic,{
                cacheControl:"3600",
                upsert: false

            }).then(
                ()=>{
                    const PublicUrl = supabase.storage.from("images").getPublicUrl(picName).data.publicUrl;
                    resolve(PublicUrl);
                }
            ).catch(
                ()=>{
                    reject("Failed to upload pic")
                }
            )
        }
    )
    return promise;
}