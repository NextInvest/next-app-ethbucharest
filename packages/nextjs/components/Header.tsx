"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BanknotesIcon, Bars3Icon, BriefcaseIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Startups",
    href: "/explore/startups",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
  {
    label: "Investors",
    href: "/explore/investors",
    icon: <BanknotesIcon className="h-4 w-4" />,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: <EnvelopeIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md text-green-400" : ""
              } hover:bg-secondary hover:shadow-md hover:text-nextCardBg focus:!bg-secondary text-gray-400 active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span className={isActive ? "text-nextCardBg" : ""}>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static bg-nextCardBg top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-nextCardBg px-0 sm:px-2 mx-auto mt-5 rounded-xl">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex ">
          <div className="flex justify-center items-center w-full h-full">
            <Logo size={{ width: "232", height: "60" }} />
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};

export const Logo = ({ size }: { size: { width: string; height: string } }) => {
  const { width, height } = size;
  return (
    <svg width={width} height={height} viewBox="0 0 232 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 30V0H6.77892L22.8321 19.9714H19.6297V0H27.6979V30H20.919L4.86585 10.0286H8.06816V30H0Z"
        fill="url(#paint0_linear_2049_1993)"
      />
      <path
        d="M41.0754 11.6143H54.5917V17.9571H41.0754V11.6143ZM41.6576 23.4429H56.879V30H33.5063V0H56.3384V6.55714H41.6576V23.4429Z"
        fill="url(#paint1_linear_2049_1993)"
      />
      <path
        d="M58.2105 30L70.9366 11.7857L70.895 17.8286L58.668 0H67.9422L75.7608 11.6143L71.8099 11.6571L79.5038 0H88.4037L76.1767 17.4857V11.4857L89.0691 30H79.587L71.6436 17.7857H75.4281L67.6095 30H58.2105Z"
        fill="url(#paint2_linear_2049_1993)"
      />
      <path d="M98.8655 30V6.72857H89.924V0H116V6.72857H107.1V30H98.8655Z" fill="url(#paint3_linear_2049_1993)" />
      <path
        d="M0 30V0H6.77892L22.8321 19.9714H19.6297V0H27.6979V30H20.919L4.86585 10.0286H8.06816V30H0Z"
        fill="url(#paint4_linear_2049_1993)"
      />
      <path
        d="M41.0754 11.6143H54.5917V17.9571H41.0754V11.6143ZM41.6576 23.4429H56.879V30H33.5063V0H56.3384V6.55714H41.6576V23.4429Z"
        fill="url(#paint5_linear_2049_1993)"
      />
      <path
        d="M58.2105 30L70.9366 11.7857L70.895 17.8286L58.668 0H67.9422L75.7608 11.6143L71.8099 11.6571L79.5038 0H88.4037L76.1767 17.4857V11.4857L89.0691 30H79.587L71.6436 17.7857H75.4281L67.6095 30H58.2105Z"
        fill="url(#paint6_linear_2049_1993)"
      />
      <path d="M98.8655 30V6.72857H89.924V0H116V6.72857H107.1V30H98.8655Z" fill="url(#paint7_linear_2049_1993)" />
      <defs>
        <linearGradient
          id="paint0_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2049_1993"
          x1="112.702"
          y1="0.697662"
          x2="-1.99218"
          y2="28.2698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0591DF" />
          <stop offset="1" stopColor="#05DF87" />
        </linearGradient>
      </defs>
    </svg>
  );
};
