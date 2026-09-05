import React, { useRef, useState } from 'react';
import "./Room.css";
import { useNavigate } from 'react-router';
import { sileo } from 'sileo';

function Room() {
  const navigate = useNavigate();
  const [roomIdArray, setRoomIdArray] = useState(Array.from({ length: 6 }, () => ""));
  const [isIdCopied, setIsIdCopied] = useState(false);

  const containerReference = useRef(null);
  const inputReferences = useRef([]);

  const handleCopyToClipboard = () => {
    const completeRoomId = roomIdArray.join("");

    if (completeRoomId.length < 6) {
      sileo.error({
        title: "Error",
        description:
          <p className='flex justify-center items-center font-semibold'>
            Please Enter a Valid 6-Digit Room ID
          </p>

      });
      return;
    }

    navigator.clipboard.writeText(completeRoomId);
    setIsIdCopied(true);
    setTimeout(() => setIsIdCopied(false), 2000);
  };

  const handlePasteId = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text").trim().replace(/[^a-zA-Z0-9]/g, "");

    if (pastedText.length > 0) {
      const pastedCharacters = pastedText.split("").slice(0, 6);
      const updatedRoomIdArray = [...roomIdArray];

      pastedCharacters.forEach((character, index) => {
        updatedRoomIdArray[index] = character;
      });

      setRoomIdArray(updatedRoomIdArray);

      const nextInputToFocus = Math.min(pastedCharacters.length, 5);
      inputReferences.current[nextInputToFocus]?.focus();
    }
  };

  const handleInputChange = (inputElement, index) => {
    // Filter out non-alphanumeric characters on manual typing
    const newCharacter = inputElement.value.slice(-1).replace(/[^a-zA-Z0-9]/g, "");

    if (!newCharacter && inputElement.value) return;

    const updatedRoomIdArray = [...roomIdArray];
    updatedRoomIdArray[index] = newCharacter;
    setRoomIdArray(updatedRoomIdArray);

    if (newCharacter && index < 5) {
      inputReferences.current[index + 1]?.focus();
    }
  };

  const handleBackspaceKey = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const updatedRoomIdArray = [...roomIdArray];

      if (roomIdArray[index]) {
        // Clear current box
        updatedRoomIdArray[index] = "";
        setRoomIdArray(updatedRoomIdArray);
      } else if (index > 0) {
        // Move back and clear previous box
        updatedRoomIdArray[index - 1] = "";
        setRoomIdArray(updatedRoomIdArray);
        inputReferences.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div ref={containerReference} className='flex h-full w-full flex-col pb-8 overflow-hidden'>
      <div className='flex items-center gap-4 w-full h-fit mb-4'>
        <img src="/Dashboard/Courses/Back.svg" alt="Go Back" className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' />
        <h1 className='text-2xl font-bold tracking-tight room-page-title'>Room</h1>
      </div>

      <div className='grow w-full flex justify-center items-left p-2 md:pb-10'>
        <div className='white-box-container w-full md:w-auto md:aspect-5/3 h-auto md:h-[80%] white small-box-shadow rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row justify-between items-center p-6 md:p-12 relative gap-8 md:gap-0'>

          <div className='flex flex-col h-full justify-center gap-6 md:gap-10 items-center md:items-start text-center md:text-left w-full md:w-auto'>
            <div className='text-2xl md:text-4xl font-extrabold leading-[1.1] room-text max-w-xs md:max-w-none pr-5'>
              Create or Join Room to chat with your Friends.
            </div>

            <div className='flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full md:w-auto'>
              <div className='flex gap-1 md:gap-2' onPaste={handlePasteId}>
                {roomIdArray.map((character, index) =>
                  <input
                    key={index}
                    ref={(element) => inputReferences.current[index] = element}
                    className='id-boxes font-black white w-8 h-10 md:w-12 md:h-14 flex items-center justify-center rounded-xl shadow-sm border border-gray-100 text-lg md:text-xl text-center outline-none focus:border-blue-500 transition-colors'
                    value={character}
                    onChange={(event) => handleInputChange(event.target, index)}
                    onKeyDown={(event) => handleBackspaceKey(event, index)} />

                )}
              </div>

              <div className="relative w-5 h-5 md:w-7 md:h-7 cursor-pointer shrink-0" onClick={handleCopyToClipboard}>
                <div className="copy-icon-room-outline absolute  inset-0 border-2 border-black rounded-md" />
                <div className="copy-icon-room-fill transition-all translate-x-2 -translate-y-2 hover:translate-x-0 hover:-translate-y-0 active:scale-50 duration-300 absolute inset-0 bg-black rounded-md flex items-center justify-center" />
              </div>

              {isIdCopied &&
                <span className='green small-box-shadow text-white px-4 py-2 rounded-xl absolute bottom-5 z-50 shadow-lg font-medium left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0'>
                  Copied to clipboard! ✅
                </span>
              }
            </div>
          </div>

          <div className='w-full md:w-1/3 flex flex-col gap-4 md:gap-5 justify-center h-full'>
            <button
              onClick={async () => {
                const roomStr = roomIdArray.join("");
                if (roomStr.length < 6) {
                  sileo.error({ title: "Error", description: "Please Enter a 6-Digit Room ID to join." });
                  return;
                }

                // Log the action!
                const userId = document.cookie.split('; ').find((row) => row.startsWith('user_id='))?.split('=')[1];
                if (userId) {
                  try {
                    await fetch("http://localhost:3000/history/add", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        user_id: userId,
                        action_title: "Joined a Room",
                        action_description: `You joined the coding discussion room ID: ${roomStr}`
                      })
                    });
                  } catch { }
                }

                navigate(`/dashboard/room/${roomStr}`);
              }}
              className='button-room-section blue py-3 md:py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'>

              Join Room
            </button>

            <button
              onClick={async () => {
                const roomStr = roomIdArray.join("");
                if (roomStr.length < 6) {
                  const generatedRoomId = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString());
                  setRoomIdArray(generatedRoomId);
                  sileo.success({
                    title: "Success",
                    description:
                      <p className='flex justify-center items-center font-semibold'>
                        Room ID Created! Click Create again to enter.
                      </p>

                  });
                  return;
                }

                // Log the action!
                const userId = document.cookie.split('; ').find((row) => row.startsWith('user_id='))?.split('=')[1];
                if (userId) {
                  try {
                    await fetch("http://localhost:3000/history/add", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        user_id: userId,
                        action_title: "Created a Room",
                        action_description: `You created and entered the coding discussion room ID: ${roomStr}`
                      })
                    });
                  } catch { }
                }

                navigate(`/dashboard/room/${roomStr}`);
              }}
              className='button-room-section blue py-3 md:py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'>

              Create Room {roomIdArray.join("").length < 6 ? "ID" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>);

}

export default Room;