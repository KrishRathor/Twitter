const PersonalChat = () => {

    const idFromUrl = () => {
        if (typeof window !== 'undefined') {
          const url = window.location.href;
          const idStartIndex = url.indexOf('chat/') + 'chat/'.length;
          const id = url.substring(idStartIndex);
          return id;
        }
        return null;
    };
    const id = idFromUrl();

    return (
        <div>
            <h1>old chat with {id} comes here</h1>
            
        </div>
    )
}

export default PersonalChat;