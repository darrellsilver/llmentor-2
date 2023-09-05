import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          LLMentor
        </h1>
        <p className="text-lg text-muted-foreground">
          Get unstuck with the help of the world&rsquo;s best authors.
        </p>
      </div>

      <div className="mt-10 max-w-[980px]">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
          Pipelines
        </h2>
        <div className="mt-4">
          <Link
            href="/new-pipelines/bde5cc31-4017-4d84-91e4-2f6c9dc0000e"
            className={buttonVariants({ variant: 'default' })}
          >
            New Pipeline Designer
          </Link>
          <Link
            href="/pipeline-designer"
            className={buttonVariants({ variant: 'secondary', className: "ml-2" })}
          >
            Legacy Pipeline Designer
          </Link>
        </div>
      </div>

      <div className="mt-10 max-w-[980px]">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
          Tools
        </h2>
        <div className="mt-4">
          <Link
            href="/tools/transcript-analysis"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Transcript Analysis
          </Link>
        </div>
      </div>

      <div className="mt-10 max-w-[980px]">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
          Books
        </h2>
        <div className="mt-4">
          <Link
            href="/books/why-we-work"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Why we Work
          </Link>
        </div>
      </div>


    </section>
  )
}
