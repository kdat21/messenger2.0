import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({info}: {info: {type: string; message: string}}) => {
    return info.type === '' && info.message === '' ? null : (
        <Alert variant={info.type}>{info.message}</Alert>
      )
}

export default AlertMessage