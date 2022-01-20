import '../landing.css';

const GuardianView = () => {
    fetch('http://agnee.tezu.ernet.in:8081/result/result.php', {
        credentials: 'omit',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        },
        'referrer': 'http://agnee.tezu.ernet.in:8081/result/',
        'body': 'txt_roll_no=CSB18013&submit=Submit',
        'method': 'POST',
        'mode': 'cors'
    }).then(data => data.html())
    .then(html => {
        document.getElementById('iframe1').contentWindow.document.write(html);
    })
    return (
        <iframe title="Manuscript">
        </iframe>
    )
}

export default GuardianView;