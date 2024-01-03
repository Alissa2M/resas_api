import React from "react";
import { render } from "@testing-library/react";
import Home from "../src/pages/index";

jest.mock("../src/pages/api/resasApi", () => ({
  getPrefectures: jest.fn(() =>
    Promise.resolve([{ prefCode: 1, prefName: "北海道" }]),
  ),
}));

describe("Home", () => {
  it("都道府県が正しく表示されること", async () => {
    const { container, getByText } = render(
      <Home prefectures={[{ prefCode: 1, prefName: "北海道" }]} />,
    );
    // expect(container.textContent).toContain("都道府県一覧");
    expect(getByText("北海道")).toBeTruthy();
  });

  it("サーバーサイドでデータが取得されること", async () => {
    const getServerSideProps = require("../src/pages/index").getServerSideProps;
    const context = {};
    const props = await getServerSideProps(context);
    expect(props).toHaveProperty("props.prefectures", [
      { prefCode: 1, prefName: "北海道" },
    ]);
  });
});
