import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const  DrawerWithSides=()=> {
  return (
    <Drawer swipeDirection="left" >
      <DrawerTrigger className="hover:bg-rose-800 bg-rose-900 text-amber-50 w-[95px] h-8.5 hover:cursor-pointer " render={<Button variant="secondary">Documents</Button>} />
      <DrawerContent>
        <DrawerHeader className="bg-[#171717]">
          {/* <DrawerTitle className="text-white">Move Goal</DrawerTitle> */}
          {/* <DrawerDescription className="text-white">Set your daily activity goal.</DrawerDescription> */}
        </DrawerHeader>
        <div className="flex-1 p-4 bg-[#171717]">
          <div className="size-full rounded-2xl bg-[#212121] " />
        </div>
        <DrawerFooter className="bg-[#171717]">
          <DrawerClose render={<Button className="hover:bg-gray-400 hover:cursor-pointer bg-green-600">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerWithSides;
