const ReceivedMessage = ({ message }) => {
  return (
    <div className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] items-start gap-[10px] received-message">
      <p className="font-Metropolis-SemiBold received-message-text">{message}</p>
    </div>
  );
};

export default ReceivedMessage;
