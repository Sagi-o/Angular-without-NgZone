import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild('node', { read: ElementRef }) node: ElementRef;
  @ContentChildren(NodeComponent, { read: ElementRef }) nodes: QueryList<ElementRef>;
  @Input() name = 'node';

  private isViewInit = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
  }

  ngAfterContentInit() {
    for (const nodeInstance of this.nodes) {
      console.log(nodeInstance.nativeElement, nodeInstance.nativeElement.getBoundingClientRect());
      this.renderer.setStyle(nodeInstance.nativeElement, 'width', (nodeInstance.nativeElement.getBoundingClientRect()))
    }
  }

  onCdCheck() {
    console.log('onCdCheck()');
    this.isViewInit && this.highlight();
  }

  highlight(highlightTimeMillis: number = 1500) {
    this.renderer.addClass(this.node.nativeElement, 'highlight');
    timer(highlightTimeMillis).pipe(
      tap(_ => this.renderer.removeClass(this.node.nativeElement, 'highlight')))
      .subscribe();
  }
}

