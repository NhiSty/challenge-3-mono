export default function ProfilePicture({base64}) {
    // if there is a base64 string, we display the image
    if (base64) {
        return (
            <div>
            <img src={`${base64}`} alt={"Profile picture"}/>
            </div>
        );
    }
    return (
        <div>
        <img src="/assets/default-avatar.png" alt={"Profile picture"}/>
        </div>
    );
}