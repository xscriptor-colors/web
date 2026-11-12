import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";
import { withBasePath } from "@/lib/base-path";
import enMessages from "../../../messages/en.json";
import styles from "./cursors.module.css";

export const metadata: Metadata = {
  title: "Cursors",
  description:
    "Install the Xscriptor-X and Xscriptor-Berlin Xcursor themes on Linux, including Hyprland, Wayland, GNOME, KDE, Xfce and X11.",
};

function getMsg(messages: Record<string, unknown>, key: string): string {
  return key.split(".").reduce<unknown>((obj, k) => {
    if (obj && typeof obj === "object" && k in obj) {
      return (obj as Record<string, unknown>)[k];
    }
    return key;
  }, messages) as string;
}

function Code({ children }: { children: string }) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <div className={styles.note}>{children}</div>;
}

const CONTACT_X = "/images/cursors/contact/x-light.png";
const CONTACT_BERLIN = "/images/cursors/contact/berlin-light.png";
const CONTACT_X_DARK = "/images/cursors/contact/x-dark.png";
const CONTACT_BERLIN_DARK = "/images/cursors/contact/berlin-dark.png";
const WAIT_X = "/images/cursors/contact/x-wait.png";
const WAIT_BERLIN = "/images/cursors/contact/berlin-wait.png";

export default function CursorsPage() {
  const msgs = enMessages;

  return (
    <section className={styles.page}>
      <header className={`${styles.header} text-center`}>
        <XTitle em={getMsg(msgs, "CursorsPage.titleEm")}>
          {getMsg(msgs, "CursorsPage.title")}
        </XTitle>
        <p className={styles.description}>
          {getMsg(msgs, "CursorsPage.description")}
        </p>
      </header>

      <div className={styles.hero}>
        <figure className={styles.mediaCard}>
          <div className={styles.mediaFrame}>
            <Image
              src={withBasePath("/images/cursors/preview-x-light.png")}
              alt="Xscriptor-X cursor set on a light background"
              width={752}
              height={702}
              className={styles.mediaImage}
            />
          </div>
          <figcaption className={styles.mediaCaption}>
            <strong>Xscriptor-X on light.</strong> The full 16-colour palette
            gradient, a gold rim and a dark contour keep every cursor readable
            on bright surfaces.
          </figcaption>
        </figure>

        <figure className={styles.mediaCard}>
          <div className={styles.mediaFrame}>
            <Image
              src={withBasePath("/images/cursors/preview-berlin-dark.png")}
              alt="Xscriptor-Berlin cursor set on a dark background"
              width={752}
              height={702}
              className={styles.mediaImage}
            />
          </div>
          <figcaption className={styles.mediaCaption}>
            <strong>Xscriptor-Berlin on dark.</strong> A monochrome body with a
            white rim, designed to stay visible on dark and light desktops.
          </figcaption>
        </figure>
      </div>

      <ul className={styles.facts}>
        <li className={styles.fact}>
          <span className={styles.factValue}>179</span>
          <span className={styles.factLabel}>entries per pack</span>
        </li>
        <li className={styles.fact}>
          <span className={styles.factValue}>78</span>
          <span className={styles.factLabel}>cursor shapes</span>
        </li>
        <li className={styles.fact}>
          <span className={styles.factValue}>101</span>
          <span className={styles.factLabel}>standard aliases</span>
        </li>
        <li className={styles.fact}>
          <span className={styles.factValue}>16-96</span>
          <span className={styles.factLabel}>pixel sizes</span>
        </li>
      </ul>

      <div className={styles.layout}>
        <aside className={styles.toc}>
          <p className={styles.tocTitle}>On this page</p>
          <nav aria-label="On this page" className={styles.tocNav}>
            <a className={styles.tocLink} href="#choose">
              1. Choose a theme
            </a>
            <a className={styles.tocLink} href="#install">
              2. Install a prebuilt theme
            </a>
            <a className={styles.tocLink} href="#build">
              3. Build from source
            </a>
            <a className={styles.tocLink} href="#activate">
              4. Activate the theme
            </a>
            <a className={styles.tocLink} href="#verify">
              5. Verify the installation
            </a>
            <a className={styles.tocLink} href="#update">
              6. Update or uninstall
            </a>
            <a className={styles.tocLink} href="#variants">
              7. Palette variants
            </a>
            <a className={styles.tocLink} href="#troubleshooting">
              8. Troubleshooting
            </a>
            <a className={styles.tocLink} href="#license">
              9. License and trademarks
            </a>
          </nav>
        </aside>

        <article className={styles.article}>
          <section id="choose" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>01</span>
              <XTitle as="h2" variant="section" align="left">
                Choose a theme
              </XTitle>
            </div>

            <p className={styles.copy}>
              Both packs share the same geometry and hotspots. Each one contains
              78 cursor shapes and 101 standard aliases, for 179 entries in ten
              sizes from 16 to 96 px. You can install both side by side and
              select one at a time.
            </p>

            <div className={styles.packGrid}>
              <article className={styles.packCard}>
                <div className={styles.packImage}>
                  <Image
                    src={withBasePath("/images/cursors/preview-x-dark.png")}
                    alt="Xscriptor-X cursor set on a dark background"
                    width={752}
                    height={702}
                    className={styles.mediaImage}
                  />
                </div>
                <h3 className={styles.packTitle}>Xscriptor-X</h3>
                <p className={styles.packCopy}>
                  Full 16-colour palette gradient, gold rim, dark contour and
                  the X mark outside the body. The most expressive of the two.
                </p>
                <p className={styles.packMeta}>
                  Full colour | 179 entries | 16-96 px
                </p>
              </article>

              <article className={styles.packCard}>
                <div className={styles.packImage}>
                  <Image
                    src={withBasePath("/images/cursors/preview-berlin-light.png")}
                    alt="Xscriptor-Berlin cursor set on a light background"
                    width={752}
                    height={702}
                    className={styles.mediaImage}
                  />
                </div>
                <h3 className={styles.packTitle}>Xscriptor-Berlin</h3>
                <p className={styles.packCopy}>
                  Monochrome body, white rim, dark contour and the X mark
                  outside the body. A quiet pack that works on any desktop.
                </p>
                <p className={styles.packMeta}>
                  Monochrome | 179 entries | 16-96 px
                </p>
              </article>
            </div>

            <p className={styles.copy}>
              The themes are plain Xcursor. They do not need Hyprcursor, a
              compositor plugin or a running daemon. Hyprland, Sway, GNOME, KDE
              Plasma, Xfce and X11 applications all read the same files.
            </p>

            <Note>
              Install both themes and switch between them whenever you change
              the rest of the desktop palette. The installation is a simple
              directory copy, so both can coexist without conflicts.
            </Note>
          </section>

          <section id="install" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>02</span>
              <XTitle as="h2" variant="section" align="left">
                Install a prebuilt theme
              </XTitle>
            </div>

            <p className={styles.copy}>
              Use this method when you already have the theme folders, either
              from a release archive or from <code className={styles.inlineCode}>build/themes/</code>{" "}
              after running the build. It does not require Python, clickgen or
              librsvg.
            </p>

            <h3 className={styles.subheading}>Per-user installation</h3>

            <Code>{`mkdir -p "$HOME/.local/share/icons"

cp -rT Xscriptor-X "$HOME/.local/share/icons/Xscriptor-X"
cp -rT Xscriptor-Berlin "$HOME/.local/share/icons/Xscriptor-Berlin"`}</Code>

            <p className={styles.copy}>
              If you are copying from a clone of the repository:
            </p>

            <Code>{`cp -rT build/themes/Xscriptor-X "$HOME/.local/share/icons/Xscriptor-X"
cp -rT build/themes/Xscriptor-Berlin "$HOME/.local/share/icons/Xscriptor-Berlin"`}</Code>

            <p className={styles.copy}>
              The legacy <code className={styles.inlineCode}>~/.icons</code>{" "}
              directory also works on desktops that still search it, but{" "}
              <code className={styles.inlineCode}>~/.local/share/icons</code> is
              the recommended XDG location.
            </p>

            <h3 className={styles.subheading}>System-wide installation</h3>

            <p className={styles.copy}>
              Install to <code className={styles.inlineCode}>/usr/share/icons</code>{" "}
              when the theme must be available to the login manager, to
              applications running as root, or to every user on the machine:
            </p>

            <Code>{`sudo mkdir -p /usr/share/icons

sudo cp -rT build/themes/Xscriptor-X /usr/share/icons/Xscriptor-X
sudo cp -rT build/themes/Xscriptor-Berlin /usr/share/icons/Xscriptor-Berlin

sudo find /usr/share/icons/Xscriptor-X -type d -exec chmod 755 {} +
sudo find /usr/share/icons/Xscriptor-X -type f -exec chmod 644 {} +
sudo find /usr/share/icons/Xscriptor-Berlin -type d -exec chmod 755 {} +
sudo find /usr/share/icons/Xscriptor-Berlin -type f -exec chmod 644 {} +`}</Code>

            <Note>
              A system-wide install makes the theme available, but the login
              manager may still have its own cursor setting. GDM, SDDM and
              other greeters are configured separately.
            </Note>
          </section>

          <section id="build" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>03</span>
              <XTitle as="h2" variant="section" align="left">
                Build and install from source
              </XTitle>
            </div>

            <p className={styles.copy}>
              Build from source when you want to regenerate the cursor files or
              change the artwork. The pipeline needs Python, clickgen, Pillow
              and librsvg.
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Linux with Xcursor support</td>
                    <td>Runs the installed themes</td>
                  </tr>
                  <tr>
                    <td>Python 3.10 or newer</td>
                    <td>Runs the generators, builders and validators</td>
                  </tr>
                  <tr>
                    <td>clickgen (ctgen)</td>
                    <td>Writes the Xcursor files</td>
                  </tr>
                  <tr>
                    <td>Pillow</td>
                    <td>Renders and inspects the PNG bitmaps</td>
                  </tr>
                  <tr>
                    <td>rsvg-convert (librsvg)</td>
                    <td>Converts the SVG sources to PNG</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={styles.copy}>
              Install <code className={styles.inlineCode}>rsvg-convert</code>{" "}
              with the package manager of your distribution:
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Distribution</th>
                    <th>Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Arch Linux</td>
                    <td>librsvg</td>
                  </tr>
                  <tr>
                    <td>Debian / Ubuntu</td>
                    <td>librsvg2-bin</td>
                  </tr>
                  <tr>
                    <td>Fedora</td>
                    <td>librsvg2-tools</td>
                  </tr>
                  <tr>
                    <td>openSUSE</td>
                    <td>librsvg or the package that provides rsvg-convert</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={styles.copy}>
              Install the Python dependencies in a virtual environment. This
              avoids the externally managed environment restrictions of recent
              distributions:
            </p>

            <Code>{`python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt`}</Code>

            <h3 className={styles.subheading}>Build and copy</h3>

            <Code>{"make install"}</Code>

            <p className={styles.copy}>
              <code className={styles.inlineCode}>make install</code> regenerates
              the SVG sources from <code className={styles.inlineCode}>scripts/</code>,
              builds both themes in{" "}
              <code className={styles.inlineCode}>build/themes/</code> and copies
              them to:
            </p>

            <Code>{`~/.local/share/icons/Xscriptor-X
~/.local/share/icons/Xscriptor-Berlin`}</Code>

            <p className={styles.copy}>
              If you only want the built folders without installing them:
            </p>

            <Code>{"make build"}</Code>

            <p className={styles.copy}>
              Then copy <code className={styles.inlineCode}>build/themes/Xscriptor-X</code>{" "}
              and <code className={styles.inlineCode}>build/themes/Xscriptor-Berlin</code>{" "}
              with the commands from section 2.
            </p>

            <Note>
              The generated binaries are not committed. The SVG sources in{" "}
              <code className={styles.inlineCode}>src/</code> are the single
              source of truth, and{" "}
              <code className={styles.inlineCode}>build/themes</code> is
              reproducible from them.
            </Note>
          </section>

          <section id="activate" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>04</span>
              <XTitle as="h2" variant="section" align="left">
                Activate the theme
              </XTitle>
            </div>

            <p className={styles.copy}>
              Pick the section for your desktop. Hyprland and other Wayland
              compositors read Xcursor themes directly; X11 applications use
              the same files.
            </p>

            <Note>
              The runtime command applies immediately. Environment variables
              apply to new processes, so log out and back in after changing
              them.
            </Note>

            <h3 className={styles.subheading}>Hyprland</h3>

            <p className={styles.copy}>Apply the theme in the running session:</p>

            <Code>{"hyprctl setcursor Xscriptor-X 24"}</Code>

            <p className={styles.copy}>
              Or use <code className={styles.inlineCode}>Xscriptor-Berlin</code>{" "}
              instead of <code className={styles.inlineCode}>Xscriptor-X</code>.
            </p>

            <p className={styles.copy}>
              To make it persistent with the Lua configuration used by Hyprland
              0.55 and newer, add the environment variables to{" "}
              <code className={styles.inlineCode}>~/.config/hypr/env.lua</code>:
            </p>

            <Code>{`hl.env("XCURSOR_THEME", "Xscriptor-X")
hl.env("XCURSOR_SIZE", "24")`}</Code>

            <p className={styles.copy}>
              Add the runtime command to{" "}
              <code className={styles.inlineCode}>~/.config/hypr/autostart.lua</code>:
            </p>

            <Code>{`hl.exec_cmd("hyprctl setcursor Xscriptor-X 24")
hl.exec_cmd("gsettings set org.gnome.desktop.interface cursor-theme 'Xscriptor-X'")
hl.exec_cmd("gsettings set org.gnome.desktop.interface cursor-size 24")`}</Code>

            <p className={styles.copy}>
              The <code className={styles.inlineCode}>gsettings</code> lines
              prevent a GTK or GNOME setting from restoring the previous cursor
              theme at the next login.
            </p>

            <p className={styles.copy}>With the legacy hyprlang configuration:</p>

            <Code>{`env = XCURSOR_THEME,Xscriptor-X
env = XCURSOR_SIZE,24
exec-once = hyprctl setcursor Xscriptor-X 24`}</Code>

            <p className={styles.copy}>
              Hyprland reads Xcursor themes directly. Hyprcursor is optional and
              is not required by these themes.
            </p>

            <h3 className={styles.subheading}>Other Wayland compositors</h3>

            <p className={styles.copy}>
              Set the variables for the whole session in{" "}
              <code className={styles.inlineCode}>~/.config/environment.d/90-cursors.conf</code>:
            </p>

            <Code>{`XCURSOR_THEME=Xscriptor-X
XCURSOR_SIZE=24`}</Code>

            <p className={styles.copy}>
              Log out and back in. For Sway, the theme can also be changed at
              runtime:
            </p>

            <Code>{"swaymsg seat seat0 xcursor_theme Xscriptor-X 24"}</Code>

            <h3 className={styles.subheading}>GNOME</h3>

            <Code>{`gsettings set org.gnome.desktop.interface cursor-theme 'Xscriptor-X'
gsettings set org.gnome.desktop.interface cursor-size 24`}</Code>

            <p className={styles.copy}>
              The same options are available in GNOME Tweaks under Appearance
              and Cursors.
            </p>

            <h3 className={styles.subheading}>KDE Plasma</h3>

            <p className={styles.copy}>
              Use System Settings, Appearance, Cursors. From a terminal:
            </p>

            <Code>{`# Plasma 6
kwriteconfig6 --file kdeglobals --group General --key cursorTheme Xscriptor-X
kwriteconfig6 --file kdeglobals --group General --key cursorSize 24

# Plasma 5
kwriteconfig5 --file kdeglobals --group General --key cursorTheme Xscriptor-X
kwriteconfig5 --file kdeglobals --group General --key cursorSize 24`}</Code>

            <p className={styles.copy}>Log out and back in.</p>

            <h3 className={styles.subheading}>Xfce</h3>

            <p className={styles.copy}>
              Use Settings, Mouse and Touchpad, Theme, or run:
            </p>

            <Code>{`xfconf-query -c xsettings -p /Gtk/CursorThemeName -s Xscriptor-X
xfconf-query -c xsettings -p /Gtk/CursorThemeSize -s 24`}</Code>

            <h3 className={styles.subheading}>X11, i3 and bspwm</h3>

            <p className={styles.copy}>
              Add the theme to <code className={styles.inlineCode}>~/.Xresources</code>:
            </p>

            <Code>{`Xcursor.theme: Xscriptor-X
Xcursor.size: 24`}</Code>

            <p className={styles.copy}>
              Merge the file and export the variables for new processes:
            </p>

            <Code>{`xrdb -merge "$HOME/.Xresources"`}</Code>

            <p className={styles.copy}>
              Add the export to{" "}
              <code className={styles.inlineCode}>~/.xprofile</code> or{" "}
              <code className={styles.inlineCode}>~/.xsession</code>:
            </p>

            <Code>{`export XCURSOR_THEME=Xscriptor-X
export XCURSOR_SIZE=24`}</Code>

            <p className={styles.copy}>
              Log out and back in so the session and the window manager inherit
              the values.
            </p>

            <h3 className={styles.subheading}>GTK applications</h3>

            <p className={styles.copy}>
              Some GTK applications read their own configuration instead of{" "}
              <code className={styles.inlineCode}>gsettings</code>. Set the theme
              in both files:
            </p>

            <Code>{`# ~/.config/gtk-3.0/settings.ini
# ~/.config/gtk-4.0/settings.ini
[Settings]
gtk-cursor-theme-name=Xscriptor-X
gtk-cursor-theme-size=24`}</Code>

            <p className={styles.copy}>
              Restart the application after editing the files.
            </p>

            <h3 className={styles.subheading}>Qt applications</h3>

            <p className={styles.copy}>
              On Wayland, Qt normally follows the compositor cursor. On X11,
              set the theme with qt5ct or qt6ct:
            </p>

            <Code>{`# ~/.config/qt5ct/qt5ct.conf or ~/.config/qt6ct/qt6ct.conf
[cursor]
cursor_theme=Xscriptor-X
cursor_size=24`}</Code>

            <p className={styles.copy}>
              The <code className={styles.inlineCode}>XCURSOR_THEME</code> and{" "}
              <code className={styles.inlineCode}>XCURSOR_SIZE</code> environment
              variables also cover most Qt setups.
            </p>

            <h3 className={styles.subheading}>Electron, Chromium and Java</h3>

            <p className={styles.copy}>
              These applications usually follow{" "}
              <code className={styles.inlineCode}>XCURSOR_THEME</code> from the
              session. Restart the application after changing the theme. An
              application started before the variable was exported keeps the
              old cursor until it is restarted.
            </p>

            <h3 className={styles.subheading}>Flatpak and Snap</h3>

            <p className={styles.copy}>
              Flatpak applications may need the theme exported inside their
              sandbox:
            </p>

            <Code>{`flatpak override --user --env=XCURSOR_THEME=Xscriptor-X
flatpak override --user --env=XCURSOR_SIZE=24`}</Code>

            <p className={styles.copy}>
              If the theme is not visible inside the sandbox, expose the icon
              directory:
            </p>

            <Code>{`flatpak override --user --filesystem="$HOME/.local/share/icons:ro"`}</Code>

            <p className={styles.copy}>
              Snap confinement varies by application. Exporting the environment
              variables is usually enough; restart the application afterwards.
            </p>
          </section>

          <section id="verify" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>05</span>
              <XTitle as="h2" variant="section" align="left">
                Verify the installation
              </XTitle>
            </div>

            <p className={styles.copy}>
              Check that the theme is complete and that the alias symlinks are
              intact:
            </p>

            <Code>{`ls "$HOME/.local/share/icons/Xscriptor-X/cursors" | wc -l
readlink "$HOME/.local/share/icons/Xscriptor-X/cursors/default"`}</Code>

            <p className={styles.copy}>
              The first command should print{" "}
              <code className={styles.inlineCode}>179</code>. The second command
              should print <code className={styles.inlineCode}>left_ptr</code>.
            </p>

            <p className={styles.copy}>
              Then apply the theme at runtime, or log out and back in:
            </p>

            <Code>{"hyprctl setcursor Xscriptor-X 24"}</Code>

            <p className={styles.copy}>
              The contact sheets below show every shape at 64, 32 and 24 px.
              Open an image in a new tab to inspect it at full size.
            </p>

            <div className={styles.contactGrid}>
              <figure className={styles.contactCard}>
                <a
                  className={styles.contactLink}
                  href={withBasePath(CONTACT_X)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Xscriptor-X contact sheet in a new tab"
                >
                  <Image
                    src={withBasePath(CONTACT_X)}
                    alt="Xscriptor-X contact sheet with all cursor shapes"
                    width={984}
                    height={2002}
                    className={styles.contactImage}
                    sizes="(min-width: 900px) 45vw, 100vw"
                  />
                </a>
                <figcaption className={styles.contactCaption}>
                  <strong>Xscriptor-X.</strong> All 78 shapes and their aliases,
                  from arrows and hands to media, drag-and-drop and utility
                  cursors.
                </figcaption>
              </figure>

              <figure className={styles.contactCard}>
                <a
                  className={styles.contactLink}
                  href={withBasePath(CONTACT_BERLIN)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Xscriptor-Berlin contact sheet in a new tab"
                >
                  <Image
                    src={withBasePath(CONTACT_BERLIN)}
                    alt="Xscriptor-Berlin contact sheet with all cursor shapes"
                    width={984}
                    height={2002}
                    className={styles.contactImage}
                    sizes="(min-width: 900px) 45vw, 100vw"
                  />
                </a>
                <figcaption className={styles.contactCaption}>
                  <strong>Xscriptor-Berlin.</strong> The same coverage in a
                  monochrome finish, with a white rim that holds up on dark
                  surfaces.
                </figcaption>
              </figure>
            </div>

            <details className={styles.details}>
              <summary className={styles.summary}>
                View the dark contact sheets
              </summary>
              <div className={`${styles.contactGrid} ${styles.detailsGrid}`}>
                <figure className={styles.contactCard}>
                  <a
                    className={styles.contactLink}
                    href={withBasePath(CONTACT_X_DARK)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the dark Xscriptor-X contact sheet in a new tab"
                  >
                    <Image
                      src={withBasePath(CONTACT_X_DARK)}
                      alt="Dark Xscriptor-X contact sheet with all cursor shapes"
                      width={984}
                      height={2002}
                      className={styles.contactImage}
                      sizes="(min-width: 900px) 45vw, 100vw"
                    />
                  </a>
                  <figcaption className={styles.contactCaption}>
                    <strong>Xscriptor-X dark.</strong> The same full set on a
                    dark surface, with the gold rim and palette gradient intact.
                  </figcaption>
                </figure>

                <figure className={styles.contactCard}>
                  <a
                    className={styles.contactLink}
                    href={withBasePath(CONTACT_BERLIN_DARK)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the dark Xscriptor-Berlin contact sheet in a new tab"
                  >
                    <Image
                      src={withBasePath(CONTACT_BERLIN_DARK)}
                      alt="Dark Xscriptor-Berlin contact sheet with all cursor shapes"
                      width={984}
                      height={2002}
                      className={styles.contactImage}
                      sizes="(min-width: 900px) 45vw, 100vw"
                    />
                  </a>
                  <figcaption className={styles.contactCaption}>
                    <strong>Xscriptor-Berlin dark.</strong> The monochrome pack
                    on the surface where its white rim matters most.
                  </figcaption>
                </figure>
              </div>
            </details>

            <div className={styles.waitRow}>
              <figure className={styles.waitCard}>
                <Image
                  src={withBasePath(WAIT_X)}
                  alt="Xscriptor-X wait cursor"
                  width={152}
                  height={150}
                  className={styles.waitImage}
                />
                <figcaption className={styles.waitCaption}>
                  <strong>X wait</strong>
                  <span>static hourglass badge</span>
                </figcaption>
              </figure>

              <figure className={styles.waitCard}>
                <Image
                  src={withBasePath(WAIT_BERLIN)}
                  alt="Xscriptor-Berlin wait cursor"
                  width={152}
                  height={150}
                  className={styles.waitImage}
                />
                <figcaption className={styles.waitCaption}>
                  <strong>Berlin wait</strong>
                  <span>static hourglass badge</span>
                </figcaption>
              </figure>
            </div>
          </section>

          <section id="update" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>06</span>
              <XTitle as="h2" variant="section" align="left">
                Update or uninstall
              </XTitle>
            </div>

            <p className={styles.copy}>
              To update, build the new version and copy it over the installed
              folder:
            </p>

            <Code>{`make build

cp -rT build/themes/Xscriptor-X "$HOME/.local/share/icons/Xscriptor-X"
cp -rT build/themes/Xscriptor-Berlin "$HOME/.local/share/icons/Xscriptor-Berlin"`}</Code>

            <p className={styles.copy}>
              Then apply the theme again or log out and back in.
            </p>

            <p className={styles.copy}>
              To uninstall a per-user installation:
            </p>

            <Code>{`rm -rf "$HOME/.local/share/icons/Xscriptor-X"
rm -rf "$HOME/.local/share/icons/Xscriptor-Berlin"`}</Code>

            <p className={styles.copy}>
              For a system-wide installation, remove the same directories from{" "}
              <code className={styles.inlineCode}>/usr/share/icons</code> with{" "}
              <code className={styles.inlineCode}>sudo</code>. Select another
              cursor theme in your desktop settings before removing the one
              that is currently active.
            </p>
          </section>

          <section id="variants" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>07</span>
              <XTitle as="h2" variant="section" align="left">
                Palette variants
              </XTitle>
            </div>

            <p className={styles.copy}>
              Xcursor themes are static files: a theme cannot recolor itself
              while the session is running. To make the cursors follow a
              palette, generate one theme per palette and switch the theme name
              when the palette changes.
            </p>

            <p className={styles.copy}>
              The <code className={styles.inlineCode}>cursors-cli</code> tool
              builds a variant from a JSON specification without touching the
              curated <code className={styles.inlineCode}>src/</code> tree:
            </p>

            <Code>{`python3 cli/cursors-cli --spec cli/examples/cursor-spec.json --out-dir build/variants`}</Code>

            <p className={styles.copy}>
              Each variant is a complete theme with its own name. Install the
              variants side by side and switch them at runtime:
            </p>

            <Code>{"hyprctl setcursor Xscriptor-X-Madrid 24"}</Code>

            <p className={styles.copy}>
              Use the same command in the palette-change hook after the
              terminal, editor and desktop colours have been updated. See the{" "}
              <a
                className={styles.link}
                href="https://github.com/xscriptor-colors/cursors#palette-variants-cursors-cli"
                target="_blank"
                rel="noopener noreferrer"
              >
                palette variants section
              </a>{" "}
              of the repository README for the specification format.
            </p>
          </section>

          <section id="troubleshooting" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>08</span>
              <XTitle as="h2" variant="section" align="left">
                Troubleshooting
              </XTitle>
            </div>

            <h3 className={styles.subheading}>
              The theme is installed but nothing changes
            </h3>

            <ol className={styles.numberedList}>
              <li>
                Apply it at runtime with{" "}
                <code className={styles.inlineCode}>
                  hyprctl setcursor Xscriptor-X 24
                </code>
                .
              </li>
              <li>
                Make sure{" "}
                <code className={styles.inlineCode}>XCURSOR_THEME</code> is
                exported to the whole session, not only to the terminal where
                you ran the command.
              </li>
              <li>
                Check that the login autostart does not reset it with{" "}
                <code className={styles.inlineCode}>gsettings</code>.
              </li>
              <li>
                Log out and back in so running applications inherit the new
                environment.
              </li>
            </ol>

            <h3 className={styles.subheading}>
              Only some applications use the old cursor
            </h3>

            <ul className={styles.list}>
              <li>
                GTK applications: check{" "}
                <code className={styles.inlineCode}>
                  ~/.config/gtk-3.0/settings.ini
                </code>{" "}
                and{" "}
                <code className={styles.inlineCode}>
                  ~/.config/gtk-4.0/settings.ini
                </code>
                .
              </li>
              <li>
                Qt applications: check qt5ct or qt6ct, or the environment
                variables.
              </li>
              <li>
                Electron, Chromium and Java applications: restart the
                application.
              </li>
              <li>
                Flatpak applications: export the variables inside the sandbox
                with <code className={styles.inlineCode}>flatpak override</code>.
              </li>
            </ul>

            <h3 className={styles.subheading}>
              The cursor is too small or too large
            </h3>

            <p className={styles.copy}>
              Set <code className={styles.inlineCode}>XCURSOR_SIZE</code> to the
              required value and log out and back in. The themes include sizes
              from 16 to 96 px. The examples use 24 px.
            </p>

            <h3 className={styles.subheading}>
              <code className={styles.inlineCode}>ctgen: command not found</code>
            </h3>

            <p className={styles.copy}>
              Activate the virtual environment and install the Python
              dependencies:
            </p>

            <Code>{`. .venv/bin/activate
pip install -r scripts/requirements.txt`}</Code>

            <h3 className={styles.subheading}>
              <code className={styles.inlineCode}>
                rsvg-convert: command not found
              </code>
            </h3>

            <p className={styles.copy}>
              Install <code className={styles.inlineCode}>librsvg</code> with the
              package manager of your distribution. See the table in section 3.
            </p>

            <h3 className={styles.subheading}>
              A cursor looks clipped or a name is missing
            </h3>

            <p className={styles.copy}>Run the validator after building:</p>

            <Code>{"make validate"}</Code>

            <p className={styles.copy}>
              The validator checks coverage, Xcursor format, hotspots and
              clipped frames. See the{" "}
              <a
                className={styles.link}
                href="https://github.com/xscriptor-colors/cursors/blob/main/docs/MANUAL.md#9-troubleshooting"
                target="_blank"
                rel="noopener noreferrer"
              >
                full troubleshooting guide
              </a>{" "}
              for more.
            </p>
          </section>

          <section id="license" className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>09</span>
              <XTitle as="h2" variant="section" align="left">
                License and trademarks
              </XTitle>
            </div>

            <ul className={styles.list}>
              <li>
                <strong>Code</strong> in{" "}
                <code className={styles.inlineCode}>scripts/</code> and the{" "}
                <code className={styles.inlineCode}>Makefile</code> is MIT. See
                the{" "}
                <a
                  className={styles.link}
                  href="https://github.com/xscriptor-colors/cursors/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LICENSE
                </a>{" "}
                file.
              </li>
              <li>
                <strong>Artwork</strong> in{" "}
                <code className={styles.inlineCode}>src/</code> and the generated
                cursors is CC BY 4.0. See the{" "}
                <a
                  className={styles.link}
                  href="https://github.com/xscriptor-colors/cursors/blob/main/LICENSE-ART"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LICENSE-ART
                </a>{" "}
                file.
              </li>
              <li>
                <strong>Names and logos</strong> are covered by{" "}
                <a
                  className={styles.link}
                  href="https://github.com/xscriptor-colors/cursors/blob/main/TRADEMARKS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TRADEMARKS.md
                </a>
                .
              </li>
            </ul>

            <div className={styles.cta}>
              <a
                className={styles.button}
                href="https://github.com/xscriptor-colors/cursors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repository on GitHub
              </a>
            </div>
          </section>
        </article>
      </div>

      <Footer />
    </section>
  );
}
