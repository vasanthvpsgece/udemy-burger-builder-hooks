import {useState, useEffect} from 'react'

const useHttpHook = httpClient => {
    const [stateError, setStateError] = useState(null);

    const {request, response} = httpClient.interceptors;
            
    const reqInterceptor = request.use(req => {
            setStateError(null)
            return req;
     })

    const resInterceptor = response.use(res => res, 
            err => {
                setStateError(err)
            })

    const useEffectFn = () => {
        request.eject(reqInterceptor);
        response.eject(resInterceptor);
    }

    useEffect(useEffectFn, [request, response, reqInterceptor, resInterceptor])

    const clicked = () => {
        setStateError(null);
    }

    return [stateError, clicked];
}

export default useHttpHook;