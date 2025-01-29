"use client";

import SVGIcons from "@/components/SVGIcons";
import { INITIAL_SEAT_MAP } from "@/components/constants";
import { useState } from "react";
import styled from "styled-components";

interface Seat {
	id: number;
	status: string;
	setByUser: boolean;
}

// Component to inject the icon created through a symbol element
// Render the svg icon using the href passed as props
const Icon = ({ href, size = 100 }: { href: string; size: number }) => (
	<svg className={href} width={size} height={size}>
		<use href={`#${href}`} />3
	</svg>
);

// Header component, displaying a heading and two buttons
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    bottom: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
    width: 1rem;
    height: 0.3rem;
    border-radius: 15px;
    background: hsl(0, 0%, 90%);
  }
`;
const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  flex-grow: 1;
  font-weight: 900;
`;
const HeaderButton = styled.button`
  color: inherit;
  background: none;
  border: 1px solid hsl(0, 0%, 92%);
  border-radius: 50%;
  margin: 0 0.25rem;
  width: 28px;
  height: 28px;
  padding: 0.35rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

// display the legend items side by side, prefaced by a matching icon
const LegendContainer = styled.div`
  display: flex;
  margin: 1.25rem 0;
  justify-content: center;
`;
const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.35rem;

  svg {
    margin-right: 0.2rem;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
`;
const LegendItemName = styled.span`
  text-transform: capitalize;
  color: hsl(0, 0%, 75%);
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 0.6rem;
`;

// render a paragraph describing the screen atop a grid describing the seats
const TheaterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.75rem 0;
`;

const TheaterScreen = styled.p`
  text-align: center;
  text-transform: uppercase;
  padding: 0.3rem 1rem;
  color: hsl(0, 0%, 80%);
  border-radius: 20px;
  border: 1px solid currentColor;
  font-size: 0.5rem;
  letter-spacing: 0.1rem;
  background: inherit;
  position: relative;

  &:before,
  &:after {
    position: absolute;
    content: "";
    top: 50%;
    transform: translate(0%, -50%);
    width: 70px;
    height: 1px;
    background: currentColor;
  }
  &:before {
    right: 100%;
  }
  &:after {
    left: 100%;
  }
`;

const TheaterSeats = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(10, 18px);
  grid-template-rows: repeat(10, 18px);
  grid-gap: 0.75rem 0.3rem;
  grid-auto-flow: dense;
`;

// invisible div used to create whitespace in the grid
const FillerSeat = styled.div`
  visibility: hidden;
  opacity: 0;
  &:nth-child(2) {
    grid-column: 10/11;
    grid-row: 1/2;
  }
  &:nth-child(3) {
    grid-row: 6/11;
    grid-column: 1/2;
  }
  &:nth-child(4) {
    grid-column: 10/11;
    grid-row: 6/11;
  }
`;

// actual seat highlighted through an icon
const Seat = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: none;
  border: none;

  svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    pointer-events: none;
  }
`;

// include the details followed by a non-wrapping, overflowing row of buttons
const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0.25rem;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px hsla(0, 0%, 0%, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 90%);
    border-radius: 5px;
  }
`;
const DetailsHeading = styled.h4`
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 0;
`;
const DetailsButton = styled.button`
  flex-shrink: 0;
  background: none;
  font-family: inherit;
  font-size: 0.7rem;
  color: hsl(0, 0%, 70%);
  border: 1px solid currentColor;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  margin: 0 0.5rem;
  display: flex;
  align-items: flex-end;
  text-transform: capitalize;

  svg {
    width: 12px;
    height: 12px;
    margin-left: 0.35rem;
    pointer-events: none;
  }
`;

// display the sum and the call to action in the bold button using the accent color as background
const CheckoutContainer = styled.button`
  margin-top: 1.75rem;
  width: 100%;
  background: var(--accent, #fd6d8e);
  box-shadow: 0 2px 5px -4px currentColor;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  font-family: inherit;
  color: var(--background, #ffffff);
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CheckoutTotal = styled.strong`
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
`;
const CheckoutAction = styled.span`
  font-size: 0.9rem;
`;

// phone screen as a rounded box with a noticeable shadow
// update the custom properties according to the theme variable
const Screen = styled.div`
  --color: ${({ theme }) => (theme === "light" ? "#2c2f62" : "#eee")};
  --background: ${({ theme }) => (theme === "light" ? "#fff" : "#2c2f62")};
  --accent: ${({ theme }) => (theme === "light" ? "#fd6d8e" : "#fcb43c")};
  border-radius: 30px;
  width: 300px;
  min-height: 500px;
  color: var(--color, #2c2f62);
  background: var(--background, #ffffff);
  padding: 2rem 2rem 1.25rem;
  box-shadow: 0 2px 10px -8px hsla(0, 0%, 0%, 0.4);
  margin: 1rem;
`;

/******************* Logic: Start updating from here ************************/

// render the two buttons making use of the Icon component
const Header = ({
	buttonSeatSelection,
}: {
	buttonSeatSelection: (shouldAdd: boolean) => void;
}) => {
	const buttons = ["plus", "minus"];
	return (
		<HeaderContainer>
			<HeaderTitle>Choose Seats</HeaderTitle>
			{buttons.map((button) => (
				<HeaderButton
					key={button}
					onClick={() => buttonSeatSelection(button === "plus")}
				>
					<Icon href={button} size="28" />
				</HeaderButton>
			))}
		</HeaderContainer>
	);
};

/**
 * Load icon files from svg. There’s no need to change this component.
 */
const Legend = ({
	seatCounter,
}: {
	seatCounter: {
		selected: number;
		available: number;
		reserved: number;
	};
}) => {
	const items = ["available", "reserved", "selected"];

	return (
		<LegendContainer>
			<div style={{ display: "none" }}>
				<SVGIcons />
			</div>
			{items.map((item) => (
				<LegendItem key={item}>
					<Icon href={item} size="16" />
					<LegendItemName>
						{item}: {seatCounter[item as keyof typeof seatCounter]}
					</LegendItemName>
				</LegendItem>
			))}
		</LegendContainer>
	);
};

/**
 * Render the grid of seats
 */
const Theater = ({
	seats = [],
	handleSeatSelection,
}: {
	seats: Seat[];
	handleSeatSelection: (id: number) => void;
}) => {
	// four FillerSeat components, occupying the selected space in the group
	const FillerSeats = Array(4)
		.fill("")
		.map((item, i) => <FillerSeat key={i} />);

	const Seats = seats.map((seat, i) => (
		<Seat
			onClick={() => handleSeatSelection(i)}
			data-index={i}
			data-status={seat.status}
			disabled={seat.status === "reserved"}
			key={i}
		>
			<Icon href={seat.status} size="16" />
		</Seat>
	));

	return (
		<TheaterContainer>
			<TheaterScreen>Screen</TheaterScreen>
			<TheaterSeats>
				{FillerSeats}
				{Seats}
			</TheaterSeats>
		</TheaterContainer>
	);
};

// for each selected seat include a button with the close icon
const Details = ({
	selectedSeats = [],
}: {
	selectedSeats?: Seat[];
}) => {
	// in the button include the text in the following format
	// row: 7 seat: 4 price: $16
	return (
		<DetailsContainer>
			<DetailsHeading>Details</DetailsHeading>
			{selectedSeats.map((selectedSeat) => {
				const entries = Object.entries(selectedSeat);
				return (
					<DetailsButton key={entries[0][1]} data-index={entries[0][1]}>
						{entries
							.map(([property, value]) => `${property}: ${value}`)
							.join(" ")
							.trim()}
						<Icon href="close" size="12" />
					</DetailsButton>
				);
			})}
		</DetailsContainer>
	);
};

const Checkout = ({
	selectedSeats,
}: {
	selectedSeats: Seat[];
}) => {
	return (
		<CheckoutContainer>
			<CheckoutTotal>${selectedSeats?.length ?? 0 * 10}</CheckoutTotal>
			<CheckoutAction>Checkout</CheckoutAction>
		</CheckoutContainer>
	);
};

// render the components making up the screen
// use the theme in the styled component
// pass the array of seats and the sum to the fitting components
const Phone = ({
	seats,
	handleSeatSelection,
	seatCounter,
	buttonSeatSelection,
}: {
	seats: Seat[];
	handleSeatSelection: (id: number) => void;
	seatCounter: {
		selected: number;
		available: number;
		reserved: number;
	};
	buttonSeatSelection: (shouldAdd: boolean) => void;
}) => {
	const selectedSeats = seats.filter((seat) => seat.status === "selected");
	return (
		<Screen theme="dark">
			<Header buttonSeatSelection={buttonSeatSelection} />
			<Legend seatCounter={seatCounter} />
			<Theater seats={seats} handleSeatSelection={handleSeatSelection} />
			<Details selectedSeats={selectedSeats} />
			<Checkout selectedSeats={selectedSeats} />
		</Screen>
	);
};

/**
 * Page component to manage the state of the application and render the phone screen(s)
 * There are 3 state to a seat:
 * - reserved: reserved by other users and cannot be changed in this app
 * - available: available to be selected
 * - selected: selected by the current user
 *
 * Each seat has a price of 10, configured in the SEAT_PRICE constant
 */

const generateSeats = (initialSeats: string[]): Seat[] => {
	return Array(initialSeats.length)
		.fill(0)
		.map((_, i) => ({
			id: i,
			status: initialSeats[i],
			setByUser: false,
		}));
};
const TicketingPage = () => {
	const [seats, setSeats] = useState(generateSeats(INITIAL_SEAT_MAP));

	const handleSeatSelection = (id: number) => {
		const wasAvailable = seats[id].status === "available";

		const updatedSeat = {
			id,
			status: wasAvailable ? "selected" : "available",
			setByUser: Boolean(wasAvailable),
		};
		const newSeats = [...seats];
		newSeats[id] = updatedSeat;
		setSeats(newSeats);
	};

	const buttonSeatSelection = (shouldAdd: boolean) => {
		if (!shouldAdd) {
			const firstSelectedSeat = seats.findIndex(
				(seat) => seat.status === "selected" && !seat.setByUser,
			);
			if (firstSelectedSeat !== -1) {
				const newSeats = [...seats];
				newSeats[firstSelectedSeat].status = "available";
				setSeats(newSeats);
			}
		} else {
			const newSeats = [...seats];
			const firstAvailableSeat = newSeats.findIndex(
				(seat) => seat.status === "available",
			);
			if (firstAvailableSeat !== -1) {
				newSeats[firstAvailableSeat].status = "selected";
				setSeats(newSeats);
			}
		}
	};

	//
	const seatCounter = {
		selected: seats.filter((seat) => seat.status === "selected").length,
		available: seats.filter((seat) => seat.status === "available").length,
		reserved: seats.filter((seat) => seat.status === "reserved").length,
	};

	return (
		<div className="app w-full flex items-center justify-center">
			<Phone
				seats={seats}
				handleSeatSelection={handleSeatSelection}
				seatCounter={seatCounter}
				buttonSeatSelection={buttonSeatSelection}
			/>
		</div>
	);
};

export default TicketingPage;
