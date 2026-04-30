import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * SPアプリ風コンテナ。
 * SP時は全画面、PC時は中央寄せ・角丸枠付き（index.htmlの挙動を踏襲）。
 */
export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-pc lg:p-8">
      <div
        className="w-full max-w-[400px] min-h-screen lg:h-[85vh]
                   bg-bg-app shadow-lifted
                   lg:rounded-[40px] lg:border-[10px] lg:border-stone-900
                   flex flex-col overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
