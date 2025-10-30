const Notification = ({ message }) => {
  if (!message) return null;
  
  const style = {
    padding: '10px',
    color: message.includes('failed') || message.includes('error') ? 'red' : 'green',
    background: '#f0f0f0',
    border: '1px solid',
    borderRadius: '5px',
    marginBottom: '10px',
  }
  return <div className="notification">{message}</div>;
};

export default Notification;
