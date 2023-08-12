import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";

export const RenderRouteWithOutletContext = ({ context, children, path }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path={path} element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
