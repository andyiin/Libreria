import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Logout from "@/components/Logout";
import { InfoUser } from "@/lib/models/usuario";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
};

export default function MenuLogged(props: { user: InfoUser }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <ChevronDownIcon className="w-5 h-12 text-[#080341]-200" aria-hidden="true" />
                    <Image
                        src="/menuIcon.svg"
                        alt="Menu icon"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="text-center absolute right-0 w-56 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <MenuItem>
                            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" href="/profile" passHref>
                                Perfil
                            </Link>
                        </MenuItem>
                    </div>
                    <div className="px-1 py-1">
                        <MenuItem>
                            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" href="/orders" passHref>
                                Mis pedidos
                            </Link>
                        </MenuItem>
                    </div>
                    {props.user.rol === "admin" && (
                        <div className="px-1 py-1">
                            <MenuItem>
                                <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" href="/dashboard" passHref>
                                    Administración
                                </Link>
                            </MenuItem>
                        </div>
                    )}
                    <div className="px-1 py-1">
                        <MenuItem>
                            <Logout/>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
  );
};
