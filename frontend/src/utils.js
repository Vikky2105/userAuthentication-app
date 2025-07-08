import { toast } from "react-toastify";

export let handleSuccess=(msg)=>{
    toast.success((msg),{
        position:"top-right"
    })
}

export let handleError=(msg)=>{
    toast.error((msg),{
        position:"top-right"
    })
}