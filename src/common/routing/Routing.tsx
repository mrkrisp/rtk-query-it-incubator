import { Route, Routes } from "react-router";
import { MainPage } from "@/app/ui/MainPage/MainPage.tsx";
import { TracksPage } from "@/features/tracks/ui/TracksPage.tsx";
import { PlaylistsPage } from "@/features/playlists/ui/PlaylistsPage.tsx";
import { ProfilePage } from "@/features/auth/ui/ProfilePage/ProfilePage.tsx";
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx";

export const Path = {
  Main: "/",
  Tracks: "/tracks",
  Playlists: "/playlists",
  Profile: "/profile",
  NotFound: "*",
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.Tracks} element={<TracksPage />} />
      <Route path={Path.Playlists} element={<PlaylistsPage />} />
      <Route path={Path.Profile} element={<ProfilePage />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
