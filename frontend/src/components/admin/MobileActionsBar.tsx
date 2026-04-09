export function MobileActionsBar() {
  return (
    <div className="fixed bottom-0 right-0 left-64 h-20 bg-surface-container-low/90 backdrop-blur-xl border-t border-outline-variant/10 px-10 flex items-center justify-between lg:hidden z-50">
      <div className="flex items-center gap-4">
        <div className="w-10 h-1 rounded-full bg-primary-fixed/20 overflow-hidden">
          <div className="h-full bg-primary-fixed w-[75%]"></div>
        </div>
        <span className="text-xs font-bold text-primary-fixed">75% Uploaded</span>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-xl text-white font-semibold text-sm">Cancel</button>
        <button className="px-6 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed font-bold text-sm">Save & Publish</button>
      </div>
    </div>
  );
}
