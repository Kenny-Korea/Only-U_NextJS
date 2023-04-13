// TODO. ChatGPT로부터 받은 테스트 코드

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Chat from "./Chat";
// import { describe, test } from "node:test";

// describe("Chat component", () => {
//   test("renders loading message when data is loading", () => {
//     const { container } = render(<Chat isLoading={true} />);
//     expect(container).toHaveTextContent("Loading...");
//   });

//   test("renders error message when there is an error", () => {
//     const { container } = render(<Chat error={true} />);
//     expect(container).toHaveTextContent("An error has occurred");
//   });

//   test("renders chat messages when data is loaded", () => {
//     const data = [
//       { regdate: "2022-01-01T00:00:00Z", message: "Hello" },
//       { regdate: "2022-01-01T01:00:00Z", message: "How are you?" },
//     ];
//     render(<Chat data={data} />);
//     expect(screen.getByText("Hello")).toBeInTheDocument();
//     expect(screen.getByText("How are you?")).toBeInTheDocument();
//   });

//   test("scrolls to latest message when data changes", () => {
//     const data = [
//       { regdate: "2022-01-01T00:00:00Z", message: "Hello" },
//       { regdate: "2022-01-01T01:00:00Z", message: "How are you?" },
//     ];
//     const { rerender } = render(<Chat data={data} />);
//     const chatBox = screen.getByRole("scrollbar");
//     chatBox.scrollTo = jest.fn();
//     const newData = [
//       ...data,
//       { regdate: "2022-01-01T02:00:00Z", message: "I'm fine" },
//     ];
//     rerender(<Chat data={newData} />);
//     expect(chatBox.scrollTo).toHaveBeenCalledWith({
//       top: chatBox.scrollHeight,
//     });
//   });

//   test("opens navbar when chat is clicked", () => {
//     const dispatch = jest.fn();
//     render(<Chat dispatch={dispatch} />);
//     const chatBox = screen.getByRole("scrollbar");
//     userEvent.click(chatBox);
//     expect(dispatch).toHaveBeenCalledWith({ type: "SHOW_NAVBAR" });
//   });
// });
