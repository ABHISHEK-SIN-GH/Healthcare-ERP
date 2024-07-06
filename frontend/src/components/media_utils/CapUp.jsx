import React, {useState} from "react";

export default function CapUp({uid=1}) {
  const [imageSrc, setImageSrc] = useState("");
  const [txtarea, setTxtarea] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full">
      <input id={`captureInput-${uid}`} className="hidden" type="file" accept="image/*" capture="environment" onChange={handleFileSelect}/>
      <div className="bg-white h-full ms-auto border-2 border-black max-w-sm flex justify-center flex-col items-center m-0 rounded-lg">
        <div className={`w-full relative rounded-lg ${(uid=='mobile')?'h-72':'h-full'}`}>
          {
            (!txtarea) ? 
            <>
              {!imageSrc && (<h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Upload Document</h2>)}
              {imageSrc && (
                <img src={imageSrc} alt="Uploaded" className="h-full w-full object-cover"/>
              )}
            </> :
            <textarea name="" className="w-full h-full rounded-lg p-3 resize-none" placeholder="Enter text here..."></textarea>
          }
        </div>
        <div className="w-full">
          <div className="flex overflow-hidden rounded-md border shadow-sm w-full">
            <button
              className="w-1/2 inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              onClick={()=>{setTxtarea(true);}}
            >
              <i class="fa-solid fa-2x fa-file-signature"></i>
            </button>
            <button
              className="w-1/2 inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              onClick={()=>{document.querySelector(`#captureInput-${uid}`).click();setTxtarea(false);}}
            >
              <i class="fa-solid fa-2x fa-camera-retro"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
