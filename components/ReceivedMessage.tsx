const ReceivedMessage = ({ message }) => {
  return (
    <div className="flex gap-[16px] self-end ">
      <div
        className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px]
      items-start gap-[10px] received-message w-fit mt-[10px]  "
      >
        <p className="font-Metropolis-SemiBold received-message-text">{message}</p>
      </div>
    </div>
  );
};

export default ReceivedMessage;
