import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * サイト全体のシェル。
 * v2: 旧「PC時に疑似スマホ枠（黒ベゼル）で囲む」構成を廃止し、
 * SP/PCともに通常のドキュメントフローで表示する。
 * 横幅の制御は Header / main / Footer 側の max-w で行う。
 */
export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      {children}
    </div>
  );
}
