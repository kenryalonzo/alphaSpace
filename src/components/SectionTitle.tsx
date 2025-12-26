interface SectionTitleProps {
    text: string;
    subtitle?: string;
}

const SectionTitle = ({ text, subtitle }: SectionTitleProps) => {
  return (
    <div className="border-b border-white/20 pb-5 mb-8">
      <h2 className="text-3xl font-medium tracking-wider capitalize cube-font text-white">
        {text}
      </h2>
      {subtitle && <p className="text-white/60 mt-2 font-light tracking-wide">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
