import React from 'react';
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';
import { BiDish } from 'react-icons/bi';
import { BsListCheck } from 'react-icons/bs';
import {
  FaBed,
  FaShower,
  FaTooth,
  FaUserAstronaut,
  FaDumbbell,
  FaTv,
  FaSink,
  FaToilet,
  FaShoppingBasket,
} from 'react-icons/fa';
import {
  GiSuperMushroom,
  GiRopeCoil,
  GiRiceCooker,
  GiConverseShoe,
  GiSecretBook,
  GiNotebook,
  GiTable,
  GiFloorPolisher,
  GiGasStove,
} from 'react-icons/gi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { ImSun } from 'react-icons/im';
import { IoTimerOutline, IoCloudSharp } from 'react-icons/io5';
import {
  MdComputer,
  MdLocalLaundryService,
  MdOutlinePedalBike,
} from 'react-icons/md';
import { RiBookMarkFill, RiFridgeFill } from 'react-icons/ri';
import { SiCounterstrike } from 'react-icons/si';

interface IconProps extends ChakraIconProps {
  iconKey: string;
}

export const iconMap: any = {
  bed: FaBed,
  shower: FaShower,
  teeth: FaTooth,
  floss: GiRopeCoil,
  cook: GiRiceCooker,
  computer: MdComputer,
  timer: IoTimerOutline,
  steps: GiConverseShoe,
  stretch: FaUserAstronaut,
  dumbbell: FaDumbbell,
  sun: ImSun,
  book: RiBookMarkFill,
  checklist: BsListCheck,
  log: GiNotebook,
  journal: GiSecretBook,
  tv: FaTv,
  dishes: BiDish,
  sink: FaSink,
  counter: SiCounterstrike,
  fridge: RiFridgeFill,
  toilet: FaToilet,
  table: GiTable,
  floor: GiFloorPolisher,
  stove: GiGasStove,
  laundry: MdLocalLaundryService,
  bike: MdOutlinePedalBike,
  cloud: IoCloudSharp,
  speak: HiOutlineSpeakerphone,
  basket: FaShoppingBasket,
};

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { iconKey } = props;
  if (iconKey in iconMap) {
    return <ChakraIcon as={iconMap[iconKey]} {...props} />;
  }
  return <ChakraIcon as={GiSuperMushroom} {...props} />;
};

export default Icon;
