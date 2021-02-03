import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

import useHttpHook from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [stateError, clicked] = useHttpHook(axios)

        return(
                <Aux>
                    <Modal show={stateError} modalClicked={clicked}>
                        {stateError? stateError.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
        )
    }
}

export default withErrorHandler;