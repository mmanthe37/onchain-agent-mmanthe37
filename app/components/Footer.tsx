export default function Footer() {
  return (
    <div className="sm:text-sm text-xs flex p-4 mt-auto w-full z-30 text-sm text-zinc-400 bg-black md:border-[#5788FA]/50 md:border-t">
      Powered by{' '}
      <a
        href="https://onchainkit.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition-colors hover:text-zinc-300"
      >
        OnchainKit
      </a>
      <span className="mx-2">·</span>
      <a
        href="https://github.com/coinbase/onchain-agent-demo"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-zinc-300"
      >
        Fork this template
      </a>
    </div>
  );
}
