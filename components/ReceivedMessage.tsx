const ReceivedMessage = ({ message }) => {
  console.log('creating blue message');
  return (
    <div
      className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] 
    items-start gap-[10px] received-message w-fit self-end"
    >
      <p className="font-Metropolis-SemiBold received-message-text">{message}</p>
    </div>
  );
};

export default ReceivedMessage;
