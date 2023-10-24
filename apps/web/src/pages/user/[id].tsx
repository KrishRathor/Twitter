const User = () => {

    const idFromUrl = () => {
        if (typeof window !== 'undefined') {
            const url = window.location.href;
            const idStartIndex = url.indexOf('user/') + 'user/'.length;
            const id = url.substring(idStartIndex);
            return id;
        }
        return null
    }
    const userId = idFromUrl();

    return (
        <div>
            { userId }
        </div>
    )
}

export default User;