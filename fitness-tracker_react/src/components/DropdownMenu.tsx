import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
} from "@chakra-ui/react";

import React from "react";
import { HiDotsVertical } from "react-icons/hi";

interface DropdownMenuProps {
  editBtn?: any;
  deleteBtn?: any;
  isDisabled?: boolean;
}
export default function DropdownMenu({
  editBtn,
  deleteBtn,
  isDisabled,
}: DropdownMenuProps) {
  if (!isDisabled) {
    return (
      <Menu placement="bottom-end">
        <MenuButton as={"button"}>
          <HiDotsVertical />
        </MenuButton>
        <MenuList>
          <MenuItem>{editBtn}</MenuItem>
          <MenuItem>{deleteBtn}</MenuItem>
        </MenuList>
      </Menu>
    );
  }
}
