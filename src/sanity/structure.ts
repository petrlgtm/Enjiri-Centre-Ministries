import type { StructureResolver } from "sanity/structure";
import {
  MicrophoneIcon,
  CalendarIcon,
  DocumentTextIcon,
  ImageIcon,
  UsersIcon,
  CommentIcon,
  HeartIcon,
  EarthGlobeIcon,
  CogIcon,
  BellIcon,
  HomeIcon,
} from "@sanity/icons";

const singletonTypes = new Set(["siteSettings", "announcementBanner", "homePage"]);

function singletonListItem(
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon: React.ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Content ──────────────────────────
      S.divider(),
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("sermon").title("Sermons").icon(MicrophoneIcon),
              S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
              S.documentTypeListItem("blogPost").title("Blog Posts").icon(DocumentTextIcon),
              S.documentTypeListItem("gallery").title("Galleries").icon(ImageIcon),
            ]),
        ),

      // ── Church ──────────────────────────
      S.divider(),
      S.listItem()
        .title("Church")
        .child(
          S.list()
            .title("Church")
            .items([
              S.documentTypeListItem("leader").title("Leaders").icon(UsersIcon),
              S.documentTypeListItem("testimony").title("Testimonies").icon(CommentIcon),
              S.documentTypeListItem("ministry").title("Ministries").icon(HeartIcon),
              S.documentTypeListItem("charityProgram")
                .title("Outreach Programs")
                .icon(EarthGlobeIcon),
            ]),
        ),

      // ── Pages ──────────────────────────
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([singletonListItem(S, "homePage", "Home Page", HomeIcon)]),
        ),

      // ── Settings ──────────────────────────
      S.divider(),
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              singletonListItem(S, "siteSettings", "Site Settings", CogIcon),
              singletonListItem(S, "announcementBanner", "Announcement Banner", BellIcon),
            ]),
        ),
    ]);

export const singletonActions = (type: string) => {
  if (singletonTypes.has(type)) {
    return ["publish", "discardChanges", "restore"];
  }
  return undefined;
};

export const singletonNewDocumentOptions = (type: string) => {
  return !singletonTypes.has(type);
};
