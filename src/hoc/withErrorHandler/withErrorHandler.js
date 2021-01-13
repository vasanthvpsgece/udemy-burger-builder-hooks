import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            //super(props);
            
            const reqInterceptorTemp = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            const resInterceptorTemp = axios.interceptors.response.use(res => res, 
                err => {
                    console.log("interceptor called", err)
                    this.setState({error: err})
                    console.log("Temp", this.state.error)
                })
            
            console.log("Did Mount", this.state.error, WrappedComponent)
            this.setState({reqInterceptor: reqInterceptorTemp, resInterceptor: resInterceptorTemp});
        }

        // componentDidMount() {
        //     console.log("Did Mount", WrappedComponent)
        // }

        componentWillUnmount() {
            console.log("Will UnMounted", WrappedComponent)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clicked = () => {
            this.setState({error: null})
        }

       render() {
        console.log("Render", this.state.error, WrappedComponent)
           return(
                <Aux>
                    <Modal show={this.state.error} modalClicked={this.clicked}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
           )
       }
    }
}

export default withErrorHandler;