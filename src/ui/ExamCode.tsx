import { X } from "lucide-react";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { FaRegClipboard, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ExamCodeProps {
  examCode: string;
}

export interface IExamCodeHandle {
  open: () => void;
  close: () => void;
}

const ExamCode = forwardRef<IExamCodeHandle, ExamCodeProps>(
  ({ examCode }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [copiedStatus, setCopiedStatus] = React.useState<
      "idle" | "copied" | "error"
    >("idle");

    // Ensure dialog is closed when component unmounts
    React.useEffect(() => {
      return () => {
        dialogRef.current?.close();
      };
    }, []);

    // Imperative handle to expose dialog controls
    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    // Improved copy to clipboard handler
    const handleCopy = useCallback(() => {
      if (!examCode) {
        setCopiedStatus("error");
        return;
      }

      navigator.clipboard
        .writeText(examCode)
        .then(() => {
          setCopiedStatus("copied");
          // Reset copied status after 2 seconds
          setTimeout(() => setCopiedStatus("idle"), 2000);
        })
        .catch(() => {
          setCopiedStatus("error");
          // Reset error status after 2 seconds
          setTimeout(() => setCopiedStatus("idle"), 2000);
        });
    }, [examCode]);

    // Render copy icon with status
    const renderCopyIcon = () => {
      switch (copiedStatus) {
        case "copied":
          return <FaCheckCircle className="text-green-500" />;
        case "error":
          return <FaRegClipboard className="text-red-500" />;
        default:
          return (
            <FaRegClipboard className="text-gray-600 hover:text-blue-500" />
          );
      }
    };

    return createPortal(
      <dialog
        ref={dialogRef}
        className="h-screen w-full bg-black/20 backdrop-blur-sm"
      >
        <div className="flex h-full items-center justify-center">
          <div className="bg-white rounded-xl relative shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Login Successful
              </h1>
              <p className="text-gray-600 mb-4">Here is your exam code</p>

              <div className="flex items-center justify-center space-x-10 bg-gray-100 rounded-lg p-4">
                <pre className="text-sm font-mono text-gray-700 break-all max-w-full overflow-x-auto">
                  {examCode}
                </pre>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors group relative"
                  aria-label="Copy exam code"
                >
                  {renderCopyIcon()}
                  <span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 
                  bg-gray-800 text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedStatus === "copied" ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                to={"/"}
                className="px-6 py-2 bg-blue-500 text-white rounded-full 
              hover:bg-blue-600 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed to Login
              </Link>
            </div>
            <aside
              onClick={() => dialogRef.current?.close()}
              className="absolute top-0 right-1 cursor-pointer"
            >
              <X className="w-6 h-6" color="black" />
            </aside>
          </div>
        </div>
      </dialog>,
      document.getElementById("exam-code") as Element
    );
  }
);

ExamCode.displayName = "ExamCode";

export default ExamCode;
