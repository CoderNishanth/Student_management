import qrcode
import base64
from io import BytesIO

def generate_qr_base64(data: str) -> str:
    qr = qrcode.make(data)
    buf = BytesIO()
    qr.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode('utf-8')
