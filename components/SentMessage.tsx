const SentMessage = ({ message }) => {
  console.log('creating gray  message');

  return (
    <div
      className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] 
		items-start gap-[10px] w-fit self-start	 sent-message"
    >
      <p className="sent-message-text">{message}</p>
    </div>
  );
};

export default SentMessage;
