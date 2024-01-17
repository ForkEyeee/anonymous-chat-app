const SentMessage = ({ message }) => {
  return (
    <div className="flex gap-[16px] self-start">
      <div
        className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] 
					items-start gap-[10px] w-fit mt-[10px] ml-[50px] sent-message"
      >
        <p className="sent-message-text">{message}</p>
      </div>
    </div>
  );
};

export default SentMessage;
