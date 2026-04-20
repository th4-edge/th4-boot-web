// @ts-ignore
import * as d3 from 'd3';
// @ts-ignore
import {SimulationNodeDatum, SimulationLinkDatum} from "d3-force";
export class Topology<Node extends SimulationNodeDatum,Link extends SimulationLinkDatum<Node>>{

    protected _element:HTMLDivElement;

    protected _width:number;

    protected _height:number;

    protected _svg:d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

    protected _g:d3.Selection<SVGGElement, unknown, HTMLElement, any>;

    protected _simulation:d3.Simulation<Node, Link>;

    protected _linkElements:d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

    protected _linkLabelElements:d3.Selection<SVGTextElement, Link, SVGGElement, unknown>;

    protected _nodeElements:d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;

    protected _nodeTextElements:d3.Selection<SVGTextElement, Node, SVGGElement, unknown>;

    protected _nodes:Node[]=[];

    protected _selectedNode:Node|undefined;

    protected _links:Link[]=[];

    protected _nodeEvent:Record<string, Function[]>={};

    protected _linkEvent:Record<string, Function[]>={};

    protected _root:any;

    constructor(_element:HTMLDivElement,_root?:any) {
        this._element = _element;
        this._root = _root;
        this._width = _element.clientWidth;
        this._height = _element.clientHeight;
        this._svg = d3.select(_element)
            .append('svg')
            .attr('width', _element.clientWidth)
            .attr('height', _element.clientHeight)
            // .call(d3.zoom<SVGSVGElement, unknown>().on('zoom', (_event:any) => {
            //     this._g.attr('transform', _event.transform);
            // }))
        ;
        // 点击空白处取消
        this._svg.on('click', () => {
            this._selectedNode = undefined;
        })
        this._g = this._svg.append('g');
        this._svg.append('defs').selectAll('marker')
            .data(['end'])
            .enter().append('marker')
            .attr('id', (d:any) => d)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 25)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#999');
        this._update();
    }
    get selectedNode(){
        return this._selectedNode;
    }
    public resize(){
        this._width = this._element.clientWidth;
        this._height = this._element.clientHeight;
        this._svg.attr('width', this._width).attr('height', this._height);
        this._simulation.force('center', d3.forceCenter(this._width / 2, this._height / 2));
        this._simulation.alpha(0.3).restart();
    }

    setTopology(nodes:any,links:any){
        //
        this._g.selectAll('*').remove();
        this._nodes = nodes;
        this._links = links;
        this._update();
    }
    onNodeEvent(event:string, fn:Function){
        if(!(event in this._nodeEvent)){
            this._nodeEvent[event]=[]
        }
        this._nodeEvent[event].push(fn)
    }
    onLinkEvent(event:string, fn:Function){
        if(!(event in this._linkEvent)){
            this._linkEvent[event]=[]
        }
        this._linkEvent[event].push(fn)
    }
    protected _update(){
        this._updateSimulation();
        //
        this._updateLink();
        this._updateNode();
    }
    protected _updateSimulation(){
        this._simulation = d3.forceSimulation<Node, Link>(this._nodes)
            .force('link', d3.forceLink<Node, Link>(this._links)
                .id((d:{clzId:any}) => d.clzId)
                .distance((d:{value:number})  => 240 / (d.value || 1))
            )
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this._width / 2, this._height / 2))
            .force('collision', d3.forceCollide().radius((d:{radius:number}) => (d.radius || 15) + 10));
        this._simulation.on('tick', () => {
            // 限制节点在视图范围内
            this._tick();
        });
    }
    protected _updateLink(){
        this._linkElements = this._g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this._links)
            .enter().append('line')
            .style('cursor', 'pointer')
            .attr('class','line')
            .attr('marker-end', 'url(#end)')
            .attr('stroke-width', 1)
            .attr('stroke', '#999');
        this._linkLabelElements = this._g.append('g')
            .attr('class', 'link-labels')
            .selectAll('text')
            .data(this._links)
            .enter().append('text')
            .text((d:{name:string}) => d.name)
            .style('cursor', 'pointer')
            .attr('class','line-text')
            .attr('font-size', 10)
            .attr('text-anchor','center')
            .attr('fill', '#666')
            .on('click', (_event:any, link:Link) => {
                if('click' in this._linkEvent){
                    this._linkEvent['click'].forEach(fn=>fn(link))
                }
            })
        ;
    }
    protected _updateNode(){
        this._nodeElements = this._g.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this._nodes)
            .enter().append('circle')
            .attr('r', (d:{radius:number}) => d.radius || 45)
            .attr('class', (d:any)=>{
                if(this._root){
                    if(d.clzId === this._root.clzId){
                        return 'root';
                    }
                }
                return 'node';
            })
            .style('cursor', 'pointer')
            //.attr('class', (datum:any) =>datum.type.name||'')
            .attr('fill', '#999').attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .call(d3.drag<SVGCircleElement, Node>()
                .on('start',(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>)=>{
                    this._dragStarted(event)
                })
                .on('drag', (event: d3.D3DragEvent<SVGCircleElement, Node, unknown>)=>{
                    this._dragged(event)
                })
                .on('end', (event: d3.D3DragEvent<SVGCircleElement, Node, unknown>)=>{
                    this._dragEnded(event)
                })
            )
            .on('click', (_event:any, node:Node) => {
                //event.stopPropagation();
                this._selectedNode = node;
                if('click' in this._nodeEvent){
                    this._nodeEvent['click'].forEach(fn=>fn(node,(node as any).ship))
                }
            });
        this._nodeTextElements = this._g.append('g')
            .attr('class', 'node-labels')
            .selectAll('text')
            .data(this._nodes)
            .enter().append('text')
            .text((d: any) => d.name)
            .attr('font-size', 12)
            .attr('dx', '-12px')//(d: any) => (d.radius || 45) + 5)
            .attr('dy', '.35em')
            .attr('fill', '#FFFFFF')
            .attr('text-anchor','center')
        ;

    }

    protected _tick(){
        this._nodes.forEach((d:any) => {
            d.x = Math.max((d.radius || 15), Math.min(this._width - (d.radius || 15), d.x || 0));
            d.y = Math.max((d.radius || 15), Math.min(this._height - (d.radius || 15), d.y || 0));
        });

        this._linkElements
            .attr('x1', (d:Link) => (d.source as Node).x as number)
            .attr('y1', (d:Link) => (d.source as Node).y as number)
            .attr('x2', (d:Link) => (d.target as Node).x as number)
            .attr('y2', (d:Link) => (d.target as Node).y as number);

        this._nodeElements
            .attr('cx', (d:Node) => d.x as number)
            .attr('cy', (d:Node) => d.y as number);

        this._nodeTextElements
            .attr('x', (d:Node) => d.x as number)
            .attr('y', (d:Node) => d.y as number);

        // 定位链接标签在中间位置
        this._linkLabelElements
            .attr('x', (d:Link) => ((d.source as Node).x as number + (d.target as Node).x! as number) / 2)
            .attr('y', (d:Link) => ((d.source as Node).y as number + (d.target as Node).y! as number) / 2);
    }
    protected _dragStarted(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
        if (!event.active) {this._simulation?.alphaTarget(0.3).restart();}
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    protected _dragged(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    protected _dragEnded(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
        if (!event.active) {this._simulation?.alphaTarget(0);}
            event.subject.fx = null;
            event.subject.fy = null;
        // if (isPhysicsEnabled.value) {
        //     event.subject.fx = null;
        //     event.subject.fy = null;
        // }
    }
}