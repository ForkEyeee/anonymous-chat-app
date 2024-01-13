//client which sends message to server
const MessageBox = ({ socket }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('send_message', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-[24px] items-center gap-[24px] self-stretch fixed bottom-0 w-[100%]">
        <FaPaperclip className="attachments-icon" />
        <div className="flex justify-end items-center relative w-[100%]">
          <button type="submit" className="absolute mr-2 w-10 send-icon">
            <IoIosSend />
          </button>
          <Input
            className="border border-gray-400 rounded-lg p-4 w-full"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </div>
      </div>
    </form>
  );
};

export default MessageBox;

//server receives message from client and emits it back to client
socket.on('send_message', message => {
  const room = socket.rooms.values().next().value;
  console.log(room);
  socket.broadcast.to(room).emit('receive_message', message);
});

//client receives message and displays it
const ChatBox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.on('receive_message', message => {
      console.log(`Message received:`, message);
      setMessageReceived(prevMessages => [...prevMessages, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  console.log(messageReceived);

  return (
    <>
      {messageReceived.length > 0 &&
        messageReceived.map((message, index) => <UserMessage key={index} message={message} />)}
    </>
  );
};

export default ChatBox;
