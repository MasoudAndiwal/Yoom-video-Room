import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
}
function MeetingModal({isOpen , onClose, title , className , children , handleClick , buttonText , image , buttonIcon }: MeetingModalProps) {

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full z-[200] max-w-[520px] flex-col gap-6 border-none bg-[#1C1F2E] px-6 py-9 " >
      
          {image ? (
            <div className="flex flex-col items-center gap-4">
              <Image
                src={image}
                alt={title}
                width={72}
                height={72}
                className="mb-2"
              />
              <DialogTitle className={cn('text-3xl font-bold leading-[42px] text-white text-center', className)}>{title}</DialogTitle>
            </div>
          ) : (
            <DialogTitle className={cn('text-3xl font-bold leading-[42px] text-white', className)}>{title}</DialogTitle>
          )}
       
        <div className="flex flex-col gap-6">
              {children}
              <button 
                className="w-full bg-[#0E78F9] hover:bg-[#0E78F9]/90 text-white font-semibold rounded-[5px] py-2 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center justify-center gap-2" 
                onClick={handleClick}>
                {buttonIcon && (
                  <Image
                    src={buttonIcon}
                    alt='button icon'
                    width={18}
                    height={18}
                  />
                )}
                {buttonText || "Schedule Meeting"}
              </button>
            </div>
          
        
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal