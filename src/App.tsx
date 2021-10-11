import React, { useEffect, useState } from "react";
import AgoraRTM from "agora-rtm-sdk";
import "./app.css";
import axios from "axios";

// interface IOptions {
//   userId?: string;
//   token?: string;
// }

function App() {
  const appId = "f4b36b6c897e41bfaa3904d75da40777";
  const [options, setOptions] = useState<any>({
    userId: "",
    token: "",
  });
  const client = AgoraRTM.createInstance(appId);
  const channel = client.createChannel("test");

  // useEffect(() => {
  //   if (appId) {
  //     client = AgoraRTM.createInstance(appId)
  //   }
  // }, [appId]);
  const onInputChange = (e: any) => {
    console.log(`${e.target.id}: ${e.target.value}`);
    setOptions({
      ...options,
      [e.target.id]: e.target.value,
    });
  };

  const loginUser = async () => {
    const loginOptions = {
      uid: options.userId,
      token: "",
    };
    axios
      .get(
        `http://localhost:8080/access_token?channel=test&uid=${options.userId}`
      )
      .then((res: any) => {
        console.log(res);
        loginOptions.token = res.data?.token || "";
      });
    console.log("LOGIN OPTIONS: ", loginOptions);
    await client.login(loginOptions);
  };

  return (
    <div>
      <form id="loginForm">
        <div className="col" style={{ minWidth: 433, maxWidth: 443 }}>
          <div className="card" style={{ marginTop: 0, marginBottom: 0 }}>
            <div
              className="row card-content"
              style={{ marginBottom: 0, marginTop: 10 }}
            >
              {/* <div className="input-field">
                <label>App ID</label>
                <input type="text" placeholder="App ID" id="appID" />
              </div> */}
              <div className="input-field">
                <label>User ID</label>
                <input
                  type="text"
                  placeholder="User ID"
                  id="userId"
                  onChange={onInputChange}
                />
              </div>
              <div className="row">
                <div>
                  <button type="button" id="login" onClick={loginUser}>
                    LOGIN
                  </button>
                  <button type="button" id="logout">
                    LOGOUT
                  </button>
                </div>
              </div>
              {/* <div className="input-field">
                <label>Channel name: demoChannel</label>
              </div>
              <div className="row">
                <div>
                  <button type="button" id="join">
                    JOIN
                  </button>
                  <button type="button" id="leave">
                    LEAVE
                  </button>
                </div>
              </div>
              <div className="input-field channel-padding">
                <label>Channel Message</label>
                <input
                  type="text"
                  placeholder="channel message"
                  id="channelMessage"
                />
                <button type="button" id="send_channel_message">
                  SEND
                </button>
              </div>
              <div className="input-field">
                <label>Peer Id</label>
                <input type="text" placeholder="peer id" id="peerId" />
              </div>
              <div className="input-field channel-padding">
                <label>Peer Message</label>
                <input
                  type="text"
                  placeholder="peer message"
                  id="peerMessage"
                />
                <button type="button" id="send_peer_message">
                  SEND
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
