from fastapi import FastAPI, UploadFile, File
from rapidocr_onnxruntime import RapidOCR
import io
from PIL import Image

app = FastAPI(title="Kaogong OCR Service")
engine = RapidOCR()

@app.post("/api/ocr")
async def process_ocr(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # 将 PIL Image 转换为 RGB
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        import numpy as np
        img_array = np.array(image)
        
        # result: [dt_boxes, rec_res, scores]
        result, _ = engine(img_array)
        
        if result:
            # 提取文本并组合
            text_lines = [line[1] for line in result]
            full_text = "\n".join(text_lines)
            return {"success": True, "text": full_text}
        else:
            return {"success": True, "text": ""}
            
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
