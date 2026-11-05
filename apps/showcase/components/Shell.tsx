/** Template wrapper: scoped theme class + next/font variables. Motions are started by <MotionInit /> inside each page. */
export default function Shell({ theme, fonts, children }: { theme: string; fonts: string; children: React.ReactNode }) {
  return <div className={`tpl theme-${theme} ${fonts}`}>{children}</div>;
}
